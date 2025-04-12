import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSpotify } from "hooks/useSpotify";
import { usePlaybackControls } from "hooks/usePlaybackControls";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";
import ShowsList from "./ShowsList";
import { handleShow } from "helpers";
import TopElementSkeleton from "./TopElementSkeleton";
import SkeletonPageHeading from "components/SkeletonPageHeading";

interface ShowData {
  items: { [key: string]: any }[];
  image?: string;
  alt?: string;
  content?: string;
  description?: string;
}

const ShowDetails = () => {
  const { sdk, loading } = useSpotify();
  const { id } = useParams();

  const { data: showData, isLoading: isShowLoading } = useQuery<ShowData>({
    queryKey: ["showDetails", id],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not available");
      return new Promise((resolve, reject) => {
        handleShow(sdk, id!, (data: any) => {
          resolve(data);
        });
      });
    },
    enabled: !!sdk && !!id && !loading,
    staleTime: 300000, // 5 minutes
  });

  const { handleTopPlay, handleTrackPlay, handlePause } = usePlaybackControls(
    showData?.items || [],
  );

  return (
    <PageLayout
      overflow={false}
      pageHeading={
        isShowLoading ||
        (showData && showData.items && showData.items.length > 0) ? (
          <PageHeading
            image={showData?.image || ""}
            alt={showData?.alt || ""}
            content={showData?.content}
          />
        ) : (
          <SkeletonPageHeading />
        )
      }
      topElement={
        isShowLoading ||
        (showData && showData.items && showData.items.length > 0) ? (
          <TopElement
            lastestEpisode={showData?.items?.[0]}
            showDescription={showData?.description || ""}
            onPlay={handleTopPlay}
            onPause={handlePause}
          />
        ) : (
          <TopElementSkeleton />
        )
      }
    >
      <ShowsList
        shows={showData?.items || []}
        onPlay={handleTrackPlay}
        onPause={handlePause}
      />
    </PageLayout>
  );
};

export default ShowDetails;
