import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import Carousel from "components/Carousel";
import { useNavigate } from "react-router-dom";
import { mapToCardItems } from "utils";

const Podcasts = () => {
  const { sdk } = useSpotify();
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
    const getPodcasts = async () => {
      if (!sdk) return;
      try {
        const res = await sdk.currentUser.episodes.savedEpisodes();
        setPodcasts(mapToCardItems(res.items, { unwrap: "episode" }));
      } catch (err) {
        console.error("Podcasts error:", err);
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
    <PageLayout pageHeading={<PageHeading />}>
      <Carousel heading="Your Podcasts" items={podcasts} onClick={handlePlay} />
      {/* TODO: More sections. */}
    </PageLayout>
  );
};

export default Podcasts;
