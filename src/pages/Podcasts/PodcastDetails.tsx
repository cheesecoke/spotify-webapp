import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";

function PodcastDetail() {
  const { id } = useParams();
  const { sdk, loading } = useSpotify();

  const [showData, setShowData] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  useEffect(() => {
    if (!sdk || loading || !id) return;

    // Spotify's show endpoint
    // If you're using the 'sdk.api' or similar, it might be something like:
    // sdk.api.getShow(id, { market: 'US' })
    sdk.getShow(id, { market: "US" }).then((data: any) => {
      setShowData(data);
      setEpisodes(data.episodes.items);
      // Or if there's pagination, handle that here
    });
  }, [sdk, loading, id]);

  if (!showData) return <div>Loading...</div>;

  return (
    <div>
      {/* Render show header: cover art, name, publisher, etc. */}
      <h1>{showData.name}</h1>
      <p>{showData.publisher}</p>
      <img src={showData.images?.[0]?.url} alt={showData.name} />

      {/* Maybe a short description or tagline */}
      <p>{showData.description}</p>

      {/* Episode list */}
      {episodes.map((episode) => (
        <div key={episode.id}>
          <h3>{episode.name}</h3>
          <p>{episode.description}</p>
          {/* Possibly link to EpisodeDetail or straight up play it */}
        </div>
      ))}
    </div>
  );
}

export default PodcastDetail;
