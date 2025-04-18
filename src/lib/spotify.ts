import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export function getSpotifySDK() {
  return SpotifyApi.withUserAuthorization(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_TARGET,
    [
      "user-read-private",
      "user-read-email",
      "playlist-read-private",
      "user-library-read",
      "user-read-recently-played",
      "user-top-read",
      "user-read-playback-position",
      "streaming",
      "user-modify-playback-state",
      "user-read-playback-state",
      "app-remote-control",
      "user-follow-read",
    ],
  );
}
