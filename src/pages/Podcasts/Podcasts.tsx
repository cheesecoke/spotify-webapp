import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import Carousel from "components/Carousel";

const Podcasts = () => {
  const { sdk } = useSpotify();
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
    const getPodcasts = async () => {
      if (!sdk) return;
      try {
        const res = await sdk.currentUser.episodes.savedEpisodes();
        const items = res.items.map((item: any) => ({
          id: item.episode.id,
          title: item.episode.name,
          image: item.episode.images[0]?.url,
          description: item.episode.description,
          uri: item.episode.uri,
        }));

        setPodcasts(items);
      } catch (err) {
        console.error("Podcasts error:", err);
      }
    };

    getPodcasts();
  }, [sdk]);

  return (
    <PageLayout pageHeading={<PageHeading />}>
      <Carousel heading="Your Podcasts" items={podcasts} />
      {/* TODO: More sections. */}
    </PageLayout>
  );
};

export default Podcasts;
