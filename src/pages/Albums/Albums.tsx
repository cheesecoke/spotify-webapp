import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Card } from "components/Cards";
import { Grid } from "components/Grid";

const Album = () => {
  const { sdk } = useSpotify();
  const navigate = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [albums, setAlbums] = useState<
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

  useEffect(() => {
    const getAlbum = async () => {
      setIsLoadingData(true);
      if (!sdk) return;
      try {
        const res = await sdk.currentUser.albums.savedAlbums(20);
        console.log("res", res);
        const items = res.items.map((item: any) => ({
          id: item.album.id,
          name: item.album.name,
          image: item.album.images?.[0]?.url || "",
          description: item.album.artists?.[0]?.name,
          uri: item.album.uri,
        }));

        setAlbums(items);
      } catch (err) {
        console.error("Album error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    getAlbum();
  }, [sdk]);

  const handlePlay = (uri?: string) => {
    if (!uri) return;

    const [type, id] = uri.split(":").slice(1); // ['track', '3n3Ppam7vgaVa1iaRUc9Lp']
    if (type && id) {
      navigate(`/${type}/${id}`);
    }
  };

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        {isLoadingData || !albums || albums.length === 0
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
                onClick={handlePlay}
              />
            ))}
      </Grid>
    </PageLayout>
  );
};

export default Album;
