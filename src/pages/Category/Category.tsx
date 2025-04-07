import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Card } from "components/Cards";
import { Grid } from "components/Grid";
import { useLocation } from "react-router-dom";

const Categories = () => {
  const { sdk } = useSpotify();
  const navigate = useNavigate();
  const location = useLocation();
  const { title, id } = (location.state as { title: string; id: string }) || {};
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categories, setCategories] = useState<
    {
      id: string;
      owner?: string;
      name: string;
      image?: string | null;
      href?: string;
      description?: string;
      uri?: string;
    }[]
  >([]);

  // Library pages could be refactored to use a common component
  // The end point for get categories by playlists was not working.
  // For now, we are using the search endpoint to get the categories.
  useEffect(() => {
    const getCategories = async () => {
      setIsLoadingData(true);
      if (!sdk || !id) return;

      try {
        const searchRes = await sdk.search(title, ["playlist", "album"]);
        const playlistItems = Array.isArray(searchRes.playlists?.items)
          ? searchRes.playlists.items.filter(Boolean).slice(0, 10)
          : [];

        const albumItems = Array.isArray(searchRes.albums?.items)
          ? searchRes.albums.items.filter(Boolean).slice(0, 10)
          : [];

        const combinedItems = [...playlistItems, ...albumItems];

        const items = combinedItems.map((item: any) => ({
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

        setCategories(items);
      } catch (err) {
        console.error("Category error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    getCategories();
  }, [sdk, id, title]);

  const handlePlay = (uri?: string) => {
    console.log("uri", uri);
    if (!uri) return;

    const [type, id] = uri.split(":").slice(1); // ['track', '3n3Ppam7vgaVa1iaRUc9Lp']
    if (type && id) {
      navigate(`/${type}/${id}`);
    }
  };

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading title={title} />}>
      <Grid>
        {isLoadingData || !categories || categories.length === 0
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
                onClick={handlePlay}
              />
            ))}
      </Grid>
    </PageLayout>
  );
};

export default Categories;
