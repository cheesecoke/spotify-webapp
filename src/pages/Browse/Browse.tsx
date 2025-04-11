import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Grid } from "./Browse.styles";
import Card from "components/Cards/Card";
import { mapToCardItems } from "utils";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const { sdk } = useSpotify();
  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["browseCategories"],
    queryFn: async () => {
      const res = await sdk.browse.getCategories({ limit: 20 });
      return mapToCardItems(res.categories.items, { unwrap: "category" });
    },
    enabled: !!sdk,
    staleTime: 300000,
  });

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        {isLoading || !categories || categories.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : categories.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image ?? null}
                imageAlt={item.imageAlt}
                title={item.title}
                uri={item.uri}
                onClick={() => {
                  const cleanId = item.id?.split("/").pop()?.split("?")[0];
                  navigate(`/category/${cleanId}`, {
                    state: { title: item.title, id: cleanId },
                  });
                }}
              />
            ))}
      </Grid>
    </PageLayout>
  );
};

export default Browse;
