import { SpotifyApi } from "@spotify/web-api-ts-sdk";

//TODO: Not mixes but going to come back to this
export const getTopMixes = async (sdk: SpotifyApi) => {
  try {
    const response = await sdk.currentUser.topItems(
      "artists",
      "short_term",
      20,
    );
    return response.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      image: artist.images?.[0]?.url || "",
      type: artist.type,
    }));
  } catch (error) {
    console.error("Failed to fetch top mixes:", error);
    return [];
  }
};
