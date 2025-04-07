import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Card } from "components/Cards";
import { Grid } from "components/Grid";

const Artists = () => {
  const { sdk } = useSpotify();
  const navigate = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [artists, setArtists] = useState<
    {
      id: string;
      owner?: string;
      name: string;
      image?: string;
      href?: string;
      description?: string;
      uri?: string;
    }[]
  >([]);

  // Library pages could be refactored to use a common component
  useEffect(() => {
    const getArtists = async () => {
      setIsLoadingData(true);
      if (!sdk) return;
      try {
        const res = await sdk.currentUser.topItems("artists", "long_term", 20);
        console.log("res", res);
        const items = res.items.map((playlist: any) => ({
          id: playlist.id,
          name: playlist.name,
          image: playlist.images?.[0]?.url || "",
          description: playlist.description || playlist.owner?.display_name,
          uri: playlist.uri,
        }));

        setArtists(items);
      } catch (err) {
        console.error("Artists error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    getArtists();
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
        {isLoadingData || !artists || artists.length === 0
          ? Array.from({ length: 20 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : artists.map((item) => (
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

export default Artists;
