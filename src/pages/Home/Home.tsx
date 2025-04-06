import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";
import { getRecentlyPlayed } from "api/spotify/recently-played";
import mapToCardItems from "utils/mapToCardItems";
import PageLayout from "components/Layouts/PageLayout";
import Carousel from "components/Carousel";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { sdk, loading } = useSpotify();
  const navigate = useNavigate();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState<any>(null);
  const [topItems, setTopItems] = useState<any[]>([]);
  const [topMixes, setTopMixes] = useState<any[]>([]);
  const [topArtistName, setTopArtistName] = useState<string>("");
  const [topArtistSearch, setTopArtistSearch] = useState<any[]>([]);

  const handlePlay = (uri?: string) => {
    console.log("uri", uri);
    if (!uri) return;

    const [type, id] = uri.split(":").slice(1); // ['track', '3n3Ppam7vgaVa1iaRUc9Lp']
    if (type && id) {
      navigate(`/${type}/${id}`);
    }
  };

  useEffect(() => {
    if (!sdk || loading) return;

    const loadData = async () => {
      setIsLoadingData(true);

      try {
        // CAROUSEL 1
        const res = await sdk.currentUser.topItems("tracks", "short_term", 6);
        setTopItems(mapToCardItems(res.items));
        const topArtist = res.items[0].artists[0];
        const artistName = topArtist.name;
        setTopArtistName(artistName);
        const moreArtist = await sdk.search(artistName, ["artist"]);
        setTopArtistSearch(mapToCardItems(moreArtist.artists.items));

        // CAROUSEL 2
        const playlistsRes = await sdk.currentUser.playlists.playlists(10);
        setTopMixes(mapToCardItems(playlistsRes.items));

        // CAROUSEL 3
        const recent = await getRecentlyPlayed(sdk);
        setRecentlyPlayed(mapToCardItems(recent));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, [sdk, loading]);

  return (
    <PageLayout
      pageHeading={<PageHeading />}
      topElement={
        <TopElement
          onClick={handlePlay}
          loading={isLoadingData}
          items={topItems}
        />
      }
    >
      <Carousel
        loading={isLoadingData}
        onClick={handlePlay}
        heading={topArtistName ? `More like ${topArtistName}` : "Top Artist"}
        items={topArtistSearch}
      />
      <Carousel
        loading={isLoadingData}
        onClick={handlePlay}
        heading="Your Top Mixes"
        items={topMixes}
      />
      <Carousel
        loading={isLoadingData}
        onClick={handlePlay}
        heading="Recently Played"
        items={recentlyPlayed}
      />
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
    </PageLayout>
  );
};

export default Home;
