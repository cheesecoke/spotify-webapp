import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "hooks/useSpotify";
import { useNavigateToPlayPage } from "hooks/useNavigateToPlayPage";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Card } from "components/Cards";
import { Grid } from "components/Grid";
import { useLocation } from "react-router-dom";

const Categories = () => {
  const { sdk } = useSpotify();
  const location = useLocation();
  const { title, id } = (location.state as { title: string; id: string }) || {};
  const navigateToPlayPage = useNavigateToPlayPage();

  // Library pages could be refactored to use a common component
  // The end point for get categories by playlists was not working.
  // For now, we are using the search endpoint to get the categories.
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", title, id],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not available");
      const searchRes = await sdk.search(title, ["playlist", "album"]);
      const playlistItems = Array.isArray(searchRes.playlists?.items)
        ? searchRes.playlists.items.filter(Boolean).slice(0, 10)
        : [];
      const albumItems = Array.isArray(searchRes.albums?.items)
        ? searchRes.albums.items.filter(Boolean).slice(0, 10)
        : [];
      const combinedItems = [...playlistItems, ...albumItems];
      return combinedItems.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.images?.[0]?.url ?? null,
        description:
          item.description ||
          item.owner?.display_name ||
          item.artists?.[0]?.name ||
          "",
        uri: item.uri,
      }));
    },
    enabled: !!sdk && !!id && !!title,
    staleTime: 300000,
  });

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading title={title} />}>
      <Grid>
        {isLoading || !categories || categories.length === 0
          ? Array.from({ length: 20 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : categories.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image ?? undefined}
                imageAlt={item.name}
                title={item.name}
                description={item.description}
                uri={item.uri}
                onClick={navigateToPlayPage}
              />
            ))}
      </Grid>
    </PageLayout>
  );
};

export default Categories;
