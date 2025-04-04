declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify: typeof Spotify;
  }

  namespace Spotify {
    interface Player {
      new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }): Spotify.Player;
    }
  }
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
  player: Spotify.Player | null;
  deviceId: string | null;
}

const PlayerContext = createContext<PlayerContextValue>({
  player: null,
  deviceId: null,
});

export const useSpotifyPlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { sdk } = useSpotify();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
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
      if (!sdk || typeof sdk.getAccessToken !== "function") {
        console.warn("Spotify SDK not ready");
        return;
      }

      const tokenRes = await sdk.getAccessToken();
      const token = tokenRes?.access_token;
      if (!token) {
        console.warn("No access token available");
        return;
      }

      tokenRef.current = token;

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const playerInstance = new Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: async (cb) => {
            try {
              const tokenRes = await sdk.getAccessToken();
              console.log("Token fetched from SDK", tokenRes);
              if (tokenRes?.access_token) {
                console.log("Access token:", tokenRes.access_token);
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
          console.log("Spotify Player Ready", device_id);
          setDeviceId(device_id);
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
  }, [sdk]);

  return (
    <PlayerContext.Provider value={{ player, deviceId }}>
      {children}
    </PlayerContext.Provider>
  );
};
