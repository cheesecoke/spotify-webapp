// Remove
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export async function getRecentlyPlayed(sdk: SpotifyApi) {
  try {
    const token = await sdk.getAccessToken();
    if (!token) {
      throw new Error("Failed to retrieve access token");
    }
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch recently played tracks:",
        await response.json(),
      );
      return;
    }

    const recentTracks = await response.json();

    return recentTracks.items.map((item: any) => {
      const track = item.track;
      const artist = track.artists?.[0];
      return {
        image: track.album?.images?.[0]?.url || "",
        trackTitle: track.name,
        artistName: artist?.name || "",
        artistId: artist?.id || "",
        trackUri: track.uri,
        artistUri: artist?.uri || "",
        type: "track",
      };
    });
  } catch (error) {
    console.error("Error fetching recently played:", error);
    return [];
  }
}
