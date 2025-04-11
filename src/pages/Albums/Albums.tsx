import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "hooks/useSpotify";
import { useNavigateToPlayPage } from "hooks/useNavigateToPlayPage";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Card } from "components/Cards";
import { Grid } from "components/Grid";

const Albums = () => {
  const { sdk } = useSpotify();
  const navigateToPlayPage = useNavigateToPlayPage();

  const { data: albums, isLoading } = useQuery({
    queryKey: ["savedAlbums"],
    queryFn: async () => {
      const res = await sdk.currentUser.albums.savedAlbums(20);
      const items = res.items.map((item: any) => ({
        id: item.album.id,
        name: item.album.name,
        image: item.album.images?.[0]?.url || "",
        description: item.album.artists?.[0]?.name,
        uri: item.album.uri,
      }));
      return items;
    },
    enabled: !!sdk,
    staleTime: 300000,
  });

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        {isLoading || !albums || albums.length === 0
          ? Array.from({ length: 20 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : albums.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image}
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

export default Albums;
