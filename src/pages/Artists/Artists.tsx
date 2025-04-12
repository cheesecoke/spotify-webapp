import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "hooks/useSpotify";
import { useNavigateToPlayPage } from "hooks/useNavigateToPlayPage";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Card } from "components/Cards";
import { Grid } from "components/Grid";

const Artists = () => {
  const { sdk } = useSpotify();
  const navigateToPlayPage = useNavigateToPlayPage();

  const { data: artists, isLoading } = useQuery({
    queryKey: ["followedArtists"],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not available");
      const res = await sdk.currentUser.followedArtists(undefined, 20);
      return res.artists.items.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images?.[0]?.url || "",
        description: artist.genres ? artist.genres.join(", ") : "",
        uri: artist.uri,
      }));
    },
    enabled: !!sdk,
    staleTime: 300000,
  });

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        {isLoading || !artists || artists.length === 0
          ? Array.from({ length: 20 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : artists.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image || null}
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

export default Artists;
