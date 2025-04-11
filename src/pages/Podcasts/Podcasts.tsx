import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import Card from "components/Cards/Card";
import { useNavigate } from "react-router-dom";
import { mapToCardItems } from "utils";
import { Grid } from "components/Grid";

const Podcasts = () => {
  const { sdk } = useSpotify();
  const navigate = useNavigate();

  const { data: podcasts, isLoading } = useQuery({
    queryKey: ["savedPodcasts"],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not available");
      const res = await sdk.currentUser.shows.savedShows();
      return mapToCardItems(res.items, { unwrap: "show" });
    },
    enabled: !!sdk,
    staleTime: 300000,
  });

  const handlePlay = (uri?: string) => {
    console.log("uri", uri);
    if (!uri) return;

    const [type, id] = uri.split(":").slice(1); // ['show', 'someID']
    if (type && id) {
      navigate(`/${type}/${id}`);
    }
  };

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        {isLoading || !podcasts || podcasts.length === 0
          ? Array.from({ length: 20 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : podcasts.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image || null}
                imageAlt={item.title}
                title={item.title}
                description={item.description}
                uri={item.uri}
                onClick={handlePlay}
              />
            ))}
      </Grid>
    </PageLayout>
  );
};

export default Podcasts;
