import { useEffect, useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { getRecentlyPlayed } from "../api/spotify/recently-played";
// import { getTopMixes } from "../api/spotify/top-mixes";

const Home = () => {
  const { sdk, loading } = useSpotify();
  // const [topTracks, setTopTracks] = useState<any>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<any>(null);
  // const [topMixes, setTopMixes] = useState<any>(null);

  useEffect(() => {
    if (!sdk || loading) return;

    const loadData = async () => {
      const recent = await getRecentlyPlayed(sdk);
      setRecentlyPlayed(recent);

      // const mixes = await getTopMixes(sdk);
      // setTopMixes(mixes);
    };

    loadData();
  }, [sdk, loading]);

  const ScrollableRow = ({ children }: { children: React.ReactNode }) => (
    // TODO: Add scrollbar styles
    // ellpsis for title
    // margins
    // cards
    // clickable

    <div
      style={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ color: "black", padding: "2rem" }}>
      <h1>Home</h1>

      <section>
        <h2>🕹️ First </h2>
      </section>

      <section>
        <h2>🎧 Similar??</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {/* {JSON.stringify(topTracks, null, 2)} */}
        </pre>
      </section>

      <section>
        <h2>🎧 top mixes</h2>
        {/* <ScrollableRow>
          {topMixes?.map((mix: any, index: number) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <img
                src={mix.image}
                alt={mix.title}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h3>{mix.title}</h3>
              <p>{mix.description}</p>
            </div>
          ))}
        </ScrollableRow> */}
      </section>

      <section>
        <h2>🎧 Recently Played</h2>
        <ScrollableRow>
          {recentlyPlayed?.map((track: any, index: number) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <img
                src={track.image}
                alt={track.trackTitle}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h3>{track.trackTitle}</h3>
              <p>{track.artistName}</p>
            </div>
          ))}
        </ScrollableRow>
      </section>

      <section>
        <h2>🎧 Based on listening history</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {/* {JSON.stringify(topTracks, null, 2)} */}
        </pre>
      </section>
    </div>
  );
};

export default Home;
