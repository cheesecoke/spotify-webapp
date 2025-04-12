import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "hooks/useSpotify";
import { getRecentlyPlayed } from "api/spotify/recently-played";
import { mapToCardItems } from "utils";
import PageLayout from "components/Layouts/PageLayout";
import Carousel from "components/Carousel";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";
import { useNavigateToPlayPage } from "hooks/useNavigateToPlayPage";

interface TopItemsData {
  items: ReturnType<typeof mapToCardItems>;
  topArtist?: { name: string };
}

const Home = () => {
  const { sdk, loading } = useSpotify();
  const navigateToPlayPage = useNavigateToPlayPage();

  const { data: topItemsData, isLoading: isLoadingTopItems } =
    useQuery<TopItemsData>({
      queryKey: ["topItems"],
      queryFn: async () => {
        const res = await sdk.currentUser.topItems("tracks", "short_term", 6);
        const items = mapToCardItems(res.items, { unwrap: "track" });
        const topArtist = res.items[0]?.artists[0];
        return { items, topArtist };
      },
      enabled: !!sdk && !loading,
      staleTime: 300000,
    });

  const topArtistName = topItemsData?.topArtist?.name || "";

  const { data: topArtistSearchData, isLoading: isLoadingArtistSearch } =
    useQuery({
      queryKey: ["topArtistSearch", topArtistName],
      queryFn: async () => {
        const moreArtist = await sdk.search(topArtistName, ["artist"]);
        return mapToCardItems(moreArtist.artists.items, { unwrap: "category" });
      },
      enabled: !!sdk && !!topArtistName,
    });

  const { data: topMixesData, isLoading: isLoadingMixes } = useQuery({
    queryKey: ["topMixes"],
    queryFn: async () => {
      const playlistsRes = await sdk.currentUser.playlists.playlists(10);
      return mapToCardItems(playlistsRes.items, { unwrap: "category" });
    },
    enabled: !!sdk && !loading,
  });

  const { data: recentlyPlayedData, isLoading: isLoadingRecentlyPlayed } =
    useQuery({
      queryKey: ["recentlyPlayed"],
      queryFn: async () => {
        const recent = await getRecentlyPlayed(sdk);
        return mapToCardItems(recent, { unwrap: "track" });
      },
      enabled: !!sdk && !loading,
    });

  const isLoadingData =
    loading ||
    isLoadingTopItems ||
    isLoadingArtistSearch ||
    isLoadingMixes ||
    isLoadingRecentlyPlayed;

  return (
    <PageLayout
      pageHeading={<PageHeading />}
      topElement={
        <TopElement
          onClick={navigateToPlayPage}
          loading={isLoadingData}
          items={topItemsData?.items}
        />
      }
    >
      <Carousel
        loading={isLoadingData}
        onClick={navigateToPlayPage}
        heading={topArtistName ? `More like ${topArtistName}` : "Top Artist"}
        items={topArtistSearchData || []}
      />
      <Carousel
        loading={isLoadingData}
        onClick={navigateToPlayPage}
        heading="Your Top Mixes"
        items={topMixesData || []}
      />
      <Carousel
        loading={isLoadingData}
        onClick={navigateToPlayPage}
        heading="Recently Played"
        items={recentlyPlayedData || []}
      />
    </PageLayout>
  );
};

export default Home;
