import { mapTrackToCardItem, formatDuration, formatTime } from "utils";

export const handleArtist = async (sdk: any, id: string, setState: any) => {
  const res = await sdk.artists.topTracks(id);
  const firstTrack = res.tracks[0];
  setState({
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

export const handleAlbum = async (sdk: any, id: string, setState: any) => {
  const res = await sdk.albums.get(id);
  const trackRes = await sdk.albums.tracks(id);
  const tracks = trackRes.items;

  setState({
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

export const handlePlaylist = async (sdk: any, id: string, setState: any) => {
  const res = await sdk.playlists.getPlaylist(id);
  const tracks = res.tracks.items.map((item) => item.track);
  setState({
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

export const handleTrack = async (sdk: any, id: string, setState: any) => {
  const res = await sdk.tracks.get(id);
  setState({
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

export const handleEpisode = async (sdk: any, id: string, setState: any) => {
  const res = await sdk.episodes.get(id);
  setState({
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

export const handleShow = async (sdk: any, id: string, setState: any) => {
  const res = await sdk.shows.get(id);
  const episodes = res.episodes?.items || [];
  setState({
    items: mapTrackToCardItem(episodes),
    heading: res.name || "Show",
    image: res.images?.[0]?.url || "",
    alt: res.name,
    content: {
      type: "Show",
      title: res.name,
      artists: res.artists?.map((a: any) => a.name).join(", "),
      owner: res.album?.label,
      likes: null,
      total: 1,
      duration: formatDuration(episodes),
    },
  });
};
