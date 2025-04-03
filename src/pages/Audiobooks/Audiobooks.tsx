import { useEffect, useState } from "react";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import Carousel from "components/Carousel";

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
  const [audiobooks, setAudiobooks] = useState<AudiobooksState>({
    newAudiobooks: [],
    buzzAudiobooks: [],
  });

  useEffect(() => {
    const getAudiobooks = async () => {
      if (!sdk) return;

      // TODO: Move
      function makeItems(items: any[]) {
        return items.map((item) => ({
          id: item.id,
          title: item.name,
          image: item.images[0]?.url,
          description: item.description,
          uri: item.uri,
        }));
      }

      try {
        const resNewAudiobooks = await sdk.search("new", ["audiobook"], {
          limit: 20,
        });
        if (resNewAudiobooks.audiobooks.items.length === 0) {
          const error = new Error("Failed to fetch New audiobooks");
          (error as any).status = resNewAudiobooks.status;
          throw error;
        }
        const newAudiobooks = makeItems(resNewAudiobooks.audiobooks.items);

        const resBuzz = await sdk.search("buzz", ["audiobook"], {
          limit: 20,
        });
        if (resBuzz.audiobooks.items.length === 0) {
          const error = new Error("Failed to fetch buzz audiobooks");
          (error as any).status = resBuzz.status;
          throw error;
        }
        const buzzAudiobooks = makeItems(resBuzz.audiobooks.items);

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

  return (
    <PageLayout overflow={true} pageHeading={<PageHeading />}>
      <></>
      <Carousel
        heading="Great first audiobooks"
        items={audiobooks.newAudiobooks.slice(0, 10)}
      />
      <Carousel
        heading="What's new"
        items={audiobooks.newAudiobooks.slice(10, 20)}
      />
      <Carousel heading="Buzzworthy" items={audiobooks.buzzAudiobooks} />
    </PageLayout>
  );
};

export default Audiobooks;
