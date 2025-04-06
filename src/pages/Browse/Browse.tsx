import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Grid } from "./Browse.styles";
import Card from "components/Cards/Card";
import { mapToCardItems } from "utils";

//TODO: Make Category Page
const Browse = () => {
  const { sdk } = useSpotify();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getBrowseAllData = async () => {
      setIsLoadingData(true);
      if (!sdk) return;
      try {
        const res = await sdk.browse.getCategories({ limit: 20 });
        console.log("res:", mapToCardItems(res.categories.items));
        setCategories(mapToCardItems(res.categories.items));
      } catch (err) {
        console.error("Browse error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    getBrowseAllData();
  }, [sdk]);

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        {isLoadingData || !categories || categories.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : categories.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image}
                imageAlt={item.imageAlt}
                title={item.title}
                description={item.description}
                uri={item.uri}
              />
            ))}
      </Grid>
    </PageLayout>
  );
};

export default Browse;
