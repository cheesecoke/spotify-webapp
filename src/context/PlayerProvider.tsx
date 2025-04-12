declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify: typeof Spotify;
  }

  interface SpotifyPlayerOptions {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    volume?: number;
  }

  interface SpotifyPlayer {
    addListener(event: string, callback: (data: any) => void): void;
    connect(): Promise<boolean>;
  }

  type Spotify = {
    Player: SpotifyPlayer;
  };
}

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { useSpotify } from "hooks/useSpotify";

interface PlayerContextValue {
  player: Spotify["Player"] | null;
  deviceId: string | null;
  currentlyPlayingUri: string | null;
  setCurrentlyPlayingUri: (uri: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  pausePlayback: (deviceId: string) => Promise<void>;
  progress: number;
}

const PlayerContext = createContext<PlayerContextValue>({
  player: null,
  deviceId: null,
  currentlyPlayingUri: null,
  setCurrentlyPlayingUri: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  pausePlayback: async () => {},
  progress: 0,
});

export const useSpotifyPlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { sdk } = useSpotify();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [currentlyPlayingUri, setCurrentlyPlayingUri] = useState<string | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const tokenRef = useRef<string | null>(null);
  const pausePlayback = async (deviceId: string) => {
    if (!sdk || !deviceId) return;

    const tokenRes = await sdk.getAccessToken();
    const token = tokenRes?.access_token;
    if (!token) throw new Error("No access token");

    await fetch(
      `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  useEffect(() => {
    if (player) return;

    if (!sdk) {
      console.warn("Spotify SDK not ready");
      return;
    }

    const token = sdk.getAccessToken();
    if (!token) {
      console.warn("No access token available");
      return;
    }

    const loadPlayer = async () => {
      const existingScript = document.querySelector(
        'script[src="https://sdk.scdn.co/spotify-player.js"]',
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
      }

      window.onSpotifyWebPlaybackSDKReady = () => {
        const playerInstance = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: async (cb) => {
            try {
              const tokenRes = await sdk.getAccessToken();
              if (tokenRes?.access_token) {
                cb(tokenRes.access_token);
              } else {
                console.error("No access token returned by SDK");
              }
            } catch (err) {
              console.error("Error fetching token for Web Playback SDK", err);
            }
          },
          volume: 0.5,
        });

        playerInstance.addListener("ready", ({ device_id }) => {
          setDeviceId(String(device_id));
        });

        playerInstance.addListener("player_state_changed", (state) => {
          if (!state) return;
          setIsPlaying(!state.paused);
          setCurrentlyPlayingUri(state.track_window.current_track?.uri ?? null);
          setProgress(state.position_ms);
        });

        playerInstance.connect().then((success) => {
          if (success) {
            setPlayer(playerInstance);
          } else {
            console.error("Failed to connect Web Playback SDK");
          }
        });
      };
    };

    loadPlayer();
  }, [sdk, player]);

  return (
    <PlayerContext.Provider
      value={{
        player,
        deviceId,
        currentlyPlayingUri,
        setCurrentlyPlayingUri,
        isPlaying,
        setIsPlaying,
        pausePlayback,
        progress,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
