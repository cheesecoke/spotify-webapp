import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const getTopMixes = async (sdk: SpotifyApi) => {
  try {
    const topArtistsResponse = await sdk.currentUser.topItems(
      "artists",
      "short_term",
      5,
    );
    const seedArtistIds = topArtistsResponse.items.map((artist) => artist.id);

    const topTracksResponse = await sdk.currentUser.topItems(
      "tracks",
      "short_term",
      5,
    );
    const seedTrackIds = topTracksResponse.items.map((track) => track.id);

    const recommendations = await sdk.recommendations.get({
      seed_artists: seedArtistIds.slice(0, 2), // up to 5 total seeds allowed
      seed_tracks: seedTrackIds.slice(0, 3),
      limit: 20,
    });

    const mixes = recommendations.tracks.map((track) => ({
      id: track.id,
      title: track.name,
      image: track.album.images?.[0]?.url,
      description: track.artists.map((artist) => artist.name).join(", "),
    }));

    return mixes;
  } catch (error) {
    console.error("Error fetching top mixes:", error);
    return [];
  }
};
