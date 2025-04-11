import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { usePlaybackControls } from "hooks/usePlayBackControls";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";
import TrackList from "./TrackList";
import {
  handleArtist,
  handleAlbum,
  handlePlaylist,
  handleTrack,
  handleEpisode,
} from "helpers";

const PlayPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const contentType = location.pathname.split(
    "/",
  )[1] as keyof typeof fetchHandlers;
  const { sdk, loading } = useSpotify();

  const [items, setItems] = useState<any[]>([]);
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [content, setContent] = useState({});
  const { handleTopPlay, handleTrackPlay, handlePause, onShuffle, onMore } =
    usePlaybackControls(items);

  const fetchHandlers = useMemo(
    () => ({
      artist: handleArtist,
      album: handleAlbum,
      playlist: handlePlaylist,
      track: handleTrack,
      episode: handleEpisode,
    }),
    [],
  );

  useEffect(() => {
    if (!sdk || loading || !id) return;
    const handler = fetchHandlers[contentType];
    if (!handler) return;

    handler(sdk, id, ({ items, heading, image, alt, content }: any) => {
      setItems(items);
      setHeading(heading);
      setImage(image);
      setAlt(alt);
      setContent(content);
    });
  }, [sdk, loading, id, contentType, fetchHandlers]);

  return (
    <PageLayout
      overflow={false}
      pageHeading={
        items.length > 0 ? (
          <PageHeading image={image} alt={alt} content={content} />
        ) : null
      }
      topElement={
        <TopElement
          onPlay={handleTopPlay}
          onPause={handlePause}
          onShuffle={onShuffle}
          onMore={onMore}
        />
      }
    >
      <TrackList items={items} onPlay={handleTrackPlay} onPause={handlePause} />
    </PageLayout>
  );
};

export default PlayPage;
