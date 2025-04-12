import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "hooks/useSpotify";
import { usePlaybackControls } from "hooks/usePlaybackControls";
import { useSpotifyPlayer } from "context/PlayerProvider";
import { PauseIcon, PlayIcon } from "assets/icons";
import {
  GlobalPlayerContainer,
  TinyHorizontalCardContainer,
  TinyImage,
  TinyTextContainer,
  TinyTitle,
  TinySubtitle,
  ControlButton,
} from "./GlobalPlayer.styles";

const GlobalPlayer: React.FC = () => {
  const { sdk } = useSpotify();
  const { currentlyPlayingUri, isPlaying, player, deviceId } =
    useSpotifyPlayer();

  const trackId = currentlyPlayingUri
    ? currentlyPlayingUri.split(":")[2]
    : null;

  const { data: trackData } = useQuery({
    queryKey: ["currentlyPlayingTrack", trackId],
    queryFn: async () => {
      if (!player || !deviceId || !trackId) {
        throw new Error("Player not ready or no track available.");
      }
      try {
        return await sdk.tracks.get(trackId);
      } catch (err) {
        console.error("Error fetching track data:", err);
        throw err;
      }
    },
    enabled: !!trackId,
    staleTime: 300000,
  });

  const fallbackTrack = {
    album: { images: [{ url: null }] },
    name: "Unknown Track",
    artists: [{ name: "Unknown Artist" }],
  };
  const finalTrackData = trackData || fallbackTrack;
  const trackImageUrl = finalTrackData.album?.images?.[0]?.url;
  const trackTitle = finalTrackData.name;
  const trackArtist = finalTrackData.artists?.[0]?.name;

  const { handlePlayPause } = usePlaybackControls(
    trackData ? [finalTrackData] : [],
  );

  return (
    <GlobalPlayerContainer visible={!!trackId}>
      <TinyHorizontalCardContainer>
        {trackImageUrl ? (
          <TinyImage src={trackImageUrl || null} alt={trackTitle} />
        ) : null}
        <TinyTextContainer>
          <TinyTitle>{trackTitle}</TinyTitle>
          <TinySubtitle>{trackArtist}</TinySubtitle>
        </TinyTextContainer>
      </TinyHorizontalCardContainer>
      <ControlButton onClick={handlePlayPause}>
        {isPlaying ? (
          <PauseIcon fill="white" height="24" width="24" />
        ) : (
          <PlayIcon fill="white" height="24" width="24" />
        )}
      </ControlButton>
    </GlobalPlayerContainer>
  );
};

export default GlobalPlayer;
