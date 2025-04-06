import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";
import { useNavigate } from "react-router-dom";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import Carousel from "components/Carousel";
import { mapToCardItems } from "utils";

interface AudiobooksState {
  newAudiobooks: Array<{
    id: string;
    title: string;
    image: string;
    description: string;
    uri: string;
  }>;
  buzzAudiobooks: Array<{
    id: string;
    title: string;
    image: string;
    description: string;
    uri: string;
  }>;
}

const Audiobooks = () => {
  const { sdk } = useSpotify();
  const navigate = useNavigate();
  const [audiobooks, setAudiobooks] = useState<AudiobooksState>({
    newAudiobooks: [],
    buzzAudiobooks: [],
  });

  useEffect(() => {
    const getAudiobooks = async () => {
      if (!sdk) return;

      try {
        const resNewAudiobooks = await sdk.search("new", ["audiobook"], {
          limit: 20,
        });
        if (resNewAudiobooks.audiobooks.items.length === 0) {
          const error = new Error("Failed to fetch New audiobooks");
          (error as any).status = resNewAudiobooks.status;
          throw error;
        }
        const newAudiobooks = mapToCardItems(resNewAudiobooks.audiobooks.items);

        const resBuzz = await sdk.search("buzz", ["audiobook"], {
          limit: 20,
        });
        if (resBuzz.audiobooks.items.length === 0) {
          const error = new Error("Failed to fetch buzz audiobooks");
          (error as any).status = resBuzz.status;
          throw error;
        }
        const buzzAudiobooks = mapToCardItems(resBuzz.audiobooks.items);

        setAudiobooks({
          newAudiobooks,
          buzzAudiobooks,
        });
      } catch (error: any) {
        //TODO: Error page.
        console.error("Error fetching audiobooks", error);
      }
    };

    getAudiobooks();
  }, [sdk]);

  const handlePlay = (uri?: string) => {
    console.log("uri", uri);
    if (!uri) return;

    const [type, id] = uri.split(":").slice(1); // ['track', '3n3Ppam7vgaVa1iaRUc9Lp']
    if (type && id) {
      navigate(`/${type}/${id}`);
    }
  };

  return (
    <PageLayout overflow={true} pageHeading={<PageHeading />}>
      <Carousel
        heading="Great first audiobooks"
        items={audiobooks.newAudiobooks.slice(0, 10)}
        onClick={handlePlay}
      />
      <Carousel
        heading="What's new"
        items={audiobooks.newAudiobooks.slice(10, 20)}
        onClick={handlePlay}
      />
      <Carousel
        heading="Buzzworthy"
        items={audiobooks.buzzAudiobooks}
        onClick={handlePlay}
      />
    </PageLayout>
  );
};

export default Audiobooks;
