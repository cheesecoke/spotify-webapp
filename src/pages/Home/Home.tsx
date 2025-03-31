import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";
import { getRecentlyPlayed } from "api/spotify/recently-played";
import { getTopMixes } from "api/spotify/top-mixes";
import PageLayout from "components/Layouts/PageLayout";
import Carousel from "components/Carousel";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";

const Home = () => {
  const { sdk, loading } = useSpotify();
  const [recentlyPlayed, setRecentlyPlayed] = useState<any>(null);
  const [topMixes, setTopMixes] = useState<any>(null);
  const [topItems, setTopItems] = useState<any[]>([]); // TODO: Add Real Data.

  useEffect(() => {
    if (!sdk || loading) return;

    //TODO: Get data for specific carousels
    // For now, we'll just use the same recently played for all carousels
    const loadData = async () => {
      const recent = await getRecentlyPlayed(sdk);
      setRecentlyPlayed(recent);

      const mixes = await getTopMixes(sdk);
      setTopMixes(mixes);

      const filteredTopItems = recent.splice(0, 6);
      setTopItems(filteredTopItems);
    };

    loadData();
  }, [sdk, loading]);

  return (
    <PageLayout
      pageHeading={<PageHeading />}
      topElement={<TopElement items={topItems} />}
    >
      <Carousel
        heading="Dev Lemons & Max Motley talk Lorem"
        items={recentlyPlayed}
      />
      <Carousel heading="Your Top Mixes" items={recentlyPlayed} />
      <Carousel heading="Recently Played" items={recentlyPlayed} />
      <Carousel
        heading="Based on your recent listening"
        items={recentlyPlayed}
      />
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
    </PageLayout>
  );
};

export default Home;
