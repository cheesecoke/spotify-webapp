import { mapTrackToCardItem, formatDuration, formatTime } from "utils";

export const handleArtist = async (
  sdk: any,
  id: string,
  callBackSetState: any,
) => {
  const res = await sdk.artists.topTracks(id);
  const firstTrack = res.tracks[0];
  callBackSetState({
    items: mapTrackToCardItem(res.tracks),
    heading: firstTrack?.artists[0]?.name || "Top Tracks",
    image: firstTrack?.album?.images?.[1]?.url || "",
    alt: firstTrack?.name,
    content: {
      type: "Artist",
      title: firstTrack?.artists[0]?.name,
      artists: firstTrack?.artists
        ?.slice(0, 3)
        .map((a: any) => a.name)
        .join(", "),
      owner: null,
      likes: null,
      total: res.tracks.length,
      duration: formatDuration(res.tracks),
    },
  });
};

export const handleAlbum = async (
  sdk: any,
  id: string,
  callBackSetState: any,
) => {
  const res = await sdk.albums.get(id);
  console.log(res);
  const trackRes = await sdk.albums.tracks(id);
  const tracks = trackRes.items;

  callBackSetState({
    items: mapTrackToCardItem(tracks),
    heading: res.name || "Album",
    image: res.images?.[0]?.url || "",
    alt: res.name,
    content: {
      type: "Album",
      title: res.name,
      artists: res.artists
        ?.slice(0, 3)
        .map((a: any) => a.name)
        .join(", "),
      owner: res.label,
      likes: res.popularity,
      total: res.total_tracks,
      duration: formatDuration(tracks),
    },
  });
};

export const handlePlaylist = async (
  sdk: any,
  id: string,
  callBackSetState: any,
) => {
  const res = await sdk.playlists.getPlaylist(id);
  const tracks = res.tracks.items.map((item) => item.track);
  callBackSetState({
    items: mapTrackToCardItem(tracks),
    heading: res.name || "Playlist Tracks",
    image: res.images?.[0]?.url || "",
    alt: res.name,
    content: {
      type: "Playlist",
      title: res.name,
      artists: tracks[0]?.artists
        ?.slice(0, 3)
        .map((a: any) => a.name)
        .join(", "),
      owner: res.owner?.display_name,
      likes: res.followers?.total,
      total: res.tracks.total,
      duration: formatDuration(res.tracks.items),
    },
  });
};

export const handleTrack = async (
  sdk: any,
  id: string,
  callBackSetState: any,
) => {
  const res = await sdk.tracks.get(id);
  callBackSetState({
    items: mapTrackToCardItem([res]),
    heading: res.name || "Track",
    image: res.album?.images?.[0]?.url || "",
    alt: res.name,
    content: {
      type: "Track",
      title: res.name,
      artists: res.artists?.map((a: any) => a.name).join(", "),
      owner: res.album?.label,
      likes: null,
      total: 1,
      duration: formatTime(res.duration_ms),
    },
  });
};

export const handleEpisode = async (
  sdk: any,
  id: string,
  callBackSetState: any,
) => {
  const res = await sdk.episodes.get(id);
  callBackSetState({
    items: mapTrackToCardItem([res]),
    heading: res.name || "Episode",
    image: res.images?.[0]?.url || "",
    alt: res.name,
    content: {
      type: "Episode",
      title: res.name,
      artists: res.artists?.map((a: any) => a.name).join(", "),
      owner: res.album?.label,
      likes: null,
      total: 1,
      duration: formatTime(res.duration_ms),
    },
  });
};

export const handleShow = async (
  sdk: any,
  id: string,
  callBackSetState: any,
) => {
  const res = await sdk.shows.get(id);
  console.log(res);
  const items = res.episodes?.items || [];

  const episodes = items.map((item: any) => ({
    id: item.id,
    type: item.type,
    title: item.name,
    description: item.description,
    image: item.images?.[0]?.url || "",
    alt: item.name,
    time: item.duration_ms,
    name: item.artists?.[0]?.name || "",
    uri: item.uri,
    href: item.href,
    releaseDate: item.release_date,
    resumePoint: item.resume_point,
    totalMs: item.duration_ms,
  }));

  callBackSetState({
    items: episodes,
    image: res.images?.[0]?.url || "",
    alt: res.name,
    description: res.description,
    content: {
      type: "Show",
      title: res.name,
      artists: res.artists?.map((a: any) => a.name).join(", "),
      owner: res.publisher,
      likes: null,
      total: 1,
      duration: formatDuration(episodes),
    },
  });
};
