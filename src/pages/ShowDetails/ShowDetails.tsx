import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpotify } from "hooks/useSpotify";
import { usePlaybackControls } from "hooks/usePlayBackControls";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import TopElement from "./TopElement";
import ShowsList from "./ShowsList";
import { handleShow, handleTrack } from "helpers";
import TopElementSkeleton from "./TopElementSkeleton";

const ShowDetails = () => {
  const { sdk, loading } = useSpotify();
  const { id } = useParams();

  const [items, setItems] = useState<any[]>([]);
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [showDescription, setShowDescription] = useState("");
  const [content, setContent] = useState({});

  const { handleTopPlay, handleTrackPlay, handlePause, onShuffle, onMore } =
    usePlaybackControls(items);

  useEffect(() => {
    if (!sdk || loading || !id) return;
    const handler = handleShow;
    if (!handler) return;

    handler(sdk, id, ({ items, image, alt, description, content }: any) => {
      setItems(items);
      setImage(image);
      setAlt(alt);
      setShowDescription(description);
      setContent(content);
    });
  }, [sdk, loading, id]);

  return (
    <PageLayout
      overflow={false}
      pageHeading={
        items.length > 0 ? (
          <PageHeading image={image} alt={alt} content={content} />
        ) : null
      }
      topElement={
        loading || items.length > 0 ? (
          <TopElement
            lastestEpisode={items[0]}
            showDescription={showDescription}
            onPlay={handleTopPlay}
            onPause={handlePause}
            onMore={onMore}
          />
        ) : (
          <TopElementSkeleton />
        )
      }
    >
      <ShowsList shows={items} onPlay={handleTrackPlay} onPause={handlePause} />
    </PageLayout>
  );
};

export default ShowDetails;
