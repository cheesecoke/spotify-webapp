import { useContext, createContext } from "react";

type SpotifyContextType = {
  user: any;
  loading: boolean;
  sdk: any;
};

export const SpotifyContext = createContext<SpotifyContextType | null>(null);

export function useSpotify() {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
}
