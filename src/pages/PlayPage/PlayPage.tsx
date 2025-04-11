import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import { usePlaybackControls } from "hooks/usePlaybackControls";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import SkeletonPageHeading from "components/SkeletonPageHeading";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";
import TrackList from "./TrackList";
import {
  handleArtist,
  handleAlbum,
  handlePlaylist,
  handleTrack,
  handleEpisode,
} from "helpers";

interface PlayContent {
  items: any[];
  image: string;
  alt: string;
  content: Record<string, any>;
}

const PlayPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const contentType = location.pathname.split(
    "/",
  )[1] as keyof typeof fetchHandlers;
  const { sdk, loading } = useSpotify();

  const fetchHandlers = useMemo(
    () => ({
      artist: handleArtist,
      album: handleAlbum,
      playlist: handlePlaylist,
      track: handleTrack,
      episode: handleEpisode,
    }),
    [],
  );

  const { data: playContent, isLoading } = useQuery<PlayContent>({
    queryKey: ["playPage", contentType, id],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not available");
      return new Promise((resolve, reject) => {
        const handler = fetchHandlers[contentType];
        if (!handler) {
          return reject(
            new Error("No handler for content type: " + contentType),
          );
        }
        handler(sdk, id!, (data: any) => resolve(data));
      });
    },
    enabled: !!sdk && !!id && !loading,
    staleTime: 300000,
  });

  const { items = [], image = "", alt = "", content = {} } = playContent || {};

  const { handleTopPlay, handleTrackPlay, handlePause, onShuffle, onMore } =
    usePlaybackControls(items);

  return (
    <PageLayout
      overflow={false}
      pageHeading={
        isLoading || !playContent || playContent.items.length === 0 ? (
          <SkeletonPageHeading />
        ) : items.length > 0 ? (
          <PageHeading image={image} alt={alt} content={content} />
        ) : null
      }
      topElement={
        <TopElement
          onPlay={handleTopPlay}
          onPause={handlePause}
          onShuffle={onShuffle}
          onMore={onMore}
        />
      }
    >
      <TrackList items={items} onPlay={handleTrackPlay} onPause={handlePause} />
    </PageLayout>
  );
};

export default PlayPage;
