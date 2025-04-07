import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSpotifyPlayer } from "context/PlayerProvider";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";
import TrackList from "./TrackList";
import { mapTrackToCardItem, formatDuration, formatTime } from "utils";

const PlayPage = () => {
  const { id } = useParams();
  const {
    player,
    deviceId,
    setCurrentlyPlayingUri,
    currentlyPlayingUri,
    setIsPlaying,
    isPlaying,
  } = useSpotifyPlayer();
  const location = useLocation();
  const contentType = location.pathname.split("/")[1];
  const { sdk, loading } = useSpotify();
  const { pausePlayback } = useSpotifyPlayer();

  const [items, setItems] = useState<any[]>([]);
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [content, setContent] = useState({});

  //TODO: Add global play controls.
  // - clean up page
  useEffect(() => {
    console.log("PlayPage:::contentType", contentType);
    if (!sdk || loading || !id) return;

    const fetchData = async () => {
      try {
        if (contentType === "artist") {
          const res = await sdk.artists.topTracks(id);
          console.log("res", res);
          setItems(mapTrackToCardItem(res.tracks));
          if (res.tracks.length > 0) {
            const firstTrack = res.tracks[0];
            setHeading(firstTrack.artists[0]?.name || "Top Tracks");
            setImage(firstTrack.album?.images?.[1]?.url || "");
            setAlt(firstTrack.name);
            setContent({
              type: "Artist",
              title: firstTrack.artists[0]?.name,
              artists: firstTrack.artists
                ?.slice(0, 3)
                .map((a: any) => a.name)
                .join(", "),
              owner: null,
              likes: null,
              total: res.tracks.length,
              duration: formatDuration(res.tracks),
            });
          }
        } else if (contentType === "album") {
          const res = await sdk.albums.tracks(id);
          setItems(mapTrackToCardItem(res.items));
          setHeading("Album Tracks");
          if (res.items.length > 0) {
            setImage(res.items[0].album.images[0]?.url || "");
            setAlt(res.items[0].name);
            // setContent(res.items[0].name);
          }
        } else if (contentType === "playlist") {
          const res = await sdk.playlists.getPlaylist(id);
          const tracks = res.tracks.items.map((item) => item.track);
          setItems(mapTrackToCardItem(tracks));
          setHeading(res.name || "Playlist Tracks");
          if (tracks.length > 0) {
            setImage(res.images?.[0]?.url || "");
            setAlt(res.name);
          }
          setContent({
            type: "Playlist",
            title: res.name,
            artists: res.tracks.items[0]?.track?.artists
              ?.slice(0, 3)
              .map((a: any) => a.name)
              .join(", "),
            owner: res.owner?.display_name,
            likes: res.followers?.total,
            total: res.tracks.total,
            duration: formatDuration(res.tracks.items),
          });
        } else if (contentType === "track") {
          const res = await sdk.tracks.get(id);
          console.log("res", res);
          setItems(mapTrackToCardItem([res]));
          setHeading(res.name || "Track");
          setImage(res.album?.images?.[0]?.url || "");
          setAlt(res.name);
          setContent({
            type: "Track",
            title: res.name,
            artists: res.artists?.map((a: any) => a.name).join(", "),
            owner: res.album?.label,
            likes: null,
            total: 1,
            duration: formatTime(res.duration_ms),
          });
        } else if (contentType === "episode") {
          const res = await sdk.episodes.get(id);
          console.log("res", res);
          setItems(mapTrackToCardItem([res]));
          setHeading(res.name || "Episode");
          setImage(res.images?.[0]?.url || "");
          setAlt(res.name);
          setContent({
            type: "Episode",
            title: res.name,
            artists: res.artists?.map((a: any) => a.name).join(", "),
            owner: res.album?.label,
            likes: null,
            total: 1,
            duration: formatTime(res.duration_ms),
          });
        } else if (contentType === "show") {
          const res = await sdk.shows.get(id);
          console.log("res", res);
          const episodes = res.episodes?.items || [];
          setItems(mapTrackToCardItem(episodes));
          setHeading(res.name || "Show");
          setImage(res.images?.[0]?.url || "");
          setAlt(res.name);
          setContent({
            type: "Show",
            title: res.name,
            artists: res.artists?.map((a: any) => a.name).join(", "),
            owner: res.album?.label,
            likes: null,
            total: 1,
            duration: formatDuration(res.episodes?.items),
          });
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  }, [sdk, loading, id, contentType]);

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

  const onShuffle = () => {
    console.log("onShuffle");
  };

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
