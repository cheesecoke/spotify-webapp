import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useSpotifyPlayer } from "context/PlayerProvider";
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
  handleShow,
} from "helpers";

const PlayPage = () => {
  const { id } = useParams();
  const {
    deviceId,
    setCurrentlyPlayingUri,
    currentlyPlayingUri,
    setIsPlaying,
    isPlaying,
  } = useSpotifyPlayer();
  const location = useLocation();
  const contentType = location.pathname.split(
    "/",
  )[1] as keyof typeof fetchHandlers;
  const { sdk, loading } = useSpotify();
  const { pausePlayback } = useSpotifyPlayer();

  const [items, setItems] = useState<any[]>([]);
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [content, setContent] = useState({});

  const fetchHandlers = useMemo(
    () => ({
      artist: handleArtist,
      album: handleAlbum,
      playlist: handlePlaylist,
      track: handleTrack,
      episode: handleEpisode,
      show: handleShow,
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

  const handleTopPlay = () => {
    if (!sdk || !deviceId || items.length === 0) {
      console.warn("Player not ready or no items");
      return;
    }

    sdk.player.startResumePlayback(
      deviceId,
      undefined,
      items.map((item) => item.uri),
    );
  };

  const handleTrackPlay = async (uri: string) => {
    if (!sdk || !deviceId) return;

    if (currentlyPlayingUri === uri && isPlaying) {
      if (isPlaying) {
        await sdk.player.pausePlayback(deviceId);
        setIsPlaying(false);
      } else {
        await sdk.player.startResumePlayback(deviceId, undefined, [uri]);
        setIsPlaying(true);
      }
    } else {
      await pausePlayback(deviceId);
      await sdk.player.startResumePlayback(deviceId, undefined, [uri]);
      setCurrentlyPlayingUri(uri);
      setIsPlaying(true);
    }
  };

  const handlePause = async () => {
    if (!sdk || !deviceId) return;
    await pausePlayback(deviceId);
    setIsPlaying(false);
  };

  //TODO:
  const onShuffle = () => {
    console.log("onShuffle");
  };

  //TODO:
  const onMore = () => {
    console.log("onMore");
  };

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
