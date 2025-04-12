import { useCallback } from "react";
import { useSpotify } from "hooks/useSpotify";
import { useSpotifyPlayer } from "context/PlayerProvider";

export const usePlaybackControls = (items: any[] = []) => {
  const { sdk } = useSpotify();
  const {
    deviceId,
    currentlyPlayingUri,
    isPlaying,
    setCurrentlyPlayingUri,
    setIsPlaying,
    pausePlayback,
    progress,
  } = useSpotifyPlayer();

  const handleTopPlay = useCallback(() => {
    if (!sdk || !deviceId || items.length === 0) {
      console.warn("Player not ready or no items");
      return;
    }
    sdk.player.startResumePlayback(
      deviceId,
      undefined,
      items.map((item) => item.uri),
    );
  }, [sdk, deviceId, items]);

  const handleTrackPlay = useCallback(
    async (uri: string) => {
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
    },
    [
      sdk,
      deviceId,
      currentlyPlayingUri,
      isPlaying,
      pausePlayback,
      setCurrentlyPlayingUri,
      setIsPlaying,
    ],
  );

  const handlePause = useCallback(async () => {
    if (!sdk || !deviceId) return;
    await pausePlayback(deviceId);
    setIsPlaying(false);
  }, [sdk, deviceId, pausePlayback, setIsPlaying]);

  const handlePlayPause = useCallback(async () => {
    if (!sdk || !deviceId) return;
    if (isPlaying) {
      await sdk.player.pausePlayback(deviceId);
      setIsPlaying(false);
    } else {
      const tokenRes = await sdk.getAccessToken();
      const token = tokenRes?.access_token;
      if (!token) throw new Error("No access token");

      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ position_ms: progress }),
        },
      );
      setIsPlaying(true);
    }
  }, [sdk, deviceId, isPlaying, progress, setIsPlaying]);

  const onShuffle = useCallback(() => {
    console.log("onShuffle");
  }, []);

  const onMore = useCallback(() => {
    console.log("onMore");
  }, []);

  return {
    handleTopPlay,
    handleTrackPlay,
    handlePause,
    handlePlayPause,
    onShuffle,
    onMore,
  };
};
