import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Grid, ItemWrapper, Image, Title } from "./Browse.styles";
// Limitation of SDK: Does not return new images for categories.
// Sticking with the default images for now.
// We could maually override the images if we wanted to.
//  const customImages: Record<string, string> = {
//    "0JQ5DAqbMKFEC4WFtoNRpw": "https://i.scdn.co/image/ab67706f00000002b7c0d4b0ea3ecfd015c75f48", // Hip-Hop
//    "0JQ5DAqbMKFQ00XGBls6ym": "https://i.scdn.co/image/ab67706f00000002f0c8fc33a9cf85bbaf04c8e3", // Made For You
//    Add more...
//  };

const Browse = () => {
  const { sdk } = useSpotify();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getBrowseAllData = async () => {
      if (!sdk) return;
      try {
        const res = await sdk.browse.getCategories({
          limit: 20,
        });
        const items = res.categories.items.map((category: any) => ({
          id: category.id,
          name: category.name,
          image: category.icons?.[0]?.url,
          href: category.href,
        }));
        setCategories(items);
      } catch (err) {
        console.error("Browse error:", err);
      }
    };

    getBrowseAllData();
  }, [sdk]);

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        {categories.map((item) => (
          <ItemWrapper key={item.id}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <Image src={item.image} alt={item.name} />
              <Title>{item.name}</Title>
            </a>
          </ItemWrapper>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default Browse;
