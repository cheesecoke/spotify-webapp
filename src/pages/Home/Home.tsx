import { useEffect, useState } from "react";
import { useSpotifyPlayer } from "context/PlayerProvider";
import { useSpotify } from "hooks/useSpotify";
import { getRecentlyPlayed } from "api/spotify/recently-played";
import mapToCardItems from "utils/mapToCardItems";
import PageLayout from "components/Layouts/PageLayout";
import Carousel from "components/Carousel";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";

const Home = () => {
  const { sdk, loading } = useSpotify();
  const { player, deviceId } = useSpotifyPlayer();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState<any>(null);
  const [topItems, setTopItems] = useState<any[]>([]);
  const [topMixes, setTopMixes] = useState<any[]>([]);
  const [topArtistName, setTopArtistName] = useState<string>("");
  const [topArtistSearch, setTopArtistSearch] = useState<any[]>([]);

  const handlePlay = (uri?: string) => {
    if (!uri) return;
    if (!player || !deviceId) return;

    player._options.getOAuthToken((token: string) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        body: JSON.stringify({
          uris: ["spotify:track:3n3Ppam7vgaVa1iaRUc9Lp"],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Make sure to pass token for callback
        },
      })
        .then((res) => {
          if (!res.ok) {
            console.error("Playback failed:", res.status, res.statusText);
          } else {
            console.log("Playback started");
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
        });
    });
  };

  useEffect(() => {
    if (!sdk || loading) return;

    const loadData = async () => {
      setIsLoadingData(true);

      try {
        // CAROUSEL 1
        const res = await sdk.currentUser.topItems("tracks", "short_term", 6);
        setTopItems(mapToCardItems(res.items));
        const topArtist = res.items[0].artists[0];
        const artistName = topArtist.name;
        setTopArtistName(artistName);
        const moreArtist = await sdk.search(artistName, ["artist"]);
        setTopArtistSearch(mapToCardItems(moreArtist.artists.items));

        // CAROUSEL 2
        const playlistsRes = await sdk.currentUser.playlists.playlists(10);
        setTopMixes(mapToCardItems(playlistsRes.items));

        // CAROUSEL 3
        const recent = await getRecentlyPlayed(sdk);
        setRecentlyPlayed(mapToCardItems(recent));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, [sdk, loading]);

  return (
    <PageLayout
      pageHeading={<PageHeading />}
      topElement={<TopElement loading={isLoadingData} items={topItems} />}
    >
      <Carousel
        loading={isLoadingData}
        onClick={handlePlay}
        heading={topArtistName ? `More like ${topArtistName}` : "Top Artist"}
        items={topArtistSearch}
      />
      <Carousel
        loading={isLoadingData}
        onClick={handlePlay}
        heading="Your Top Mixes"
        items={topMixes}
      />
      <Carousel
        loading={isLoadingData}
        onClick={handlePlay}
        heading="Recently Played"
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
