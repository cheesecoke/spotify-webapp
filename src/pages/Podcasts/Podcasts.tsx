import { useEffect, useState } from "react";
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
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
    const getPodcasts = async () => {
      setIsLoadingData(true);
      if (!sdk) return;
      try {
        const res = await sdk.currentUser.shows.savedShows();
        setPodcasts(mapToCardItems(res.items, { unwrap: "show" }));
      } catch (err) {
        console.error("Podcasts error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    getPodcasts();
  }, [sdk]);

  const handlePlay = (uri?: string) => {
    console.log("uri", uri);
    if (!uri) return;

    const [type, id] = uri.split(":").slice(1); // ['track', '3n3Ppam7vgaVa1iaRUc9Lp']
    if (type && id) {
      navigate(`/${type}/${id}`);
    }
  };

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        {isLoadingData || !podcasts || podcasts.length === 0
          ? Array.from({ length: 20 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : podcasts.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image}
                imageAlt={item.name}
                title={item.name}
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
