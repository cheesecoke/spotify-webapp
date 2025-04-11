import { useQuery } from "@tanstack/react-query";
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

  const { data: audiobooksData, isLoading } = useQuery<AudiobooksState>({
    queryKey: ["audiobooks"],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not available");

      // Fetch "new" audiobooks
      const resNewAudiobooks = await sdk.search("new", ["audiobook"], {
        limit: 20,
      });
      if (resNewAudiobooks.audiobooks.items.length === 0) {
        const error = new Error("Failed to fetch new audiobooks");
        (error as any).status = resNewAudiobooks.status;
        throw error;
      }
      const newAudiobooks = mapToCardItems(resNewAudiobooks.audiobooks.items);

      // Fetch "buzz" audiobooks
      const resBuzz = await sdk.search("buzz", ["audiobook"], { limit: 20 });
      if (resBuzz.audiobooks.items.length === 0) {
        const error = new Error("Failed to fetch buzz audiobooks");
        (error as any).status = resBuzz.status;
        throw error;
      }
      const buzzAudiobooks = mapToCardItems(resBuzz.audiobooks.items);

      return {
        newAudiobooks,
        buzzAudiobooks,
      };
    },
    enabled: !!sdk,
    staleTime: 300000,
  });

  const handlePlay = (uri?: string) => {
    console.log("uri", uri);
    if (!uri) return;

    const [type, id] = uri.split(":").slice(1); // e.g., ['track', '3n3Ppam7vgaVa1iaRUc9Lp']
    if (type && id) {
      navigate(`/${type}/${id}`);
    }
  };

  return (
    <PageLayout overflow={true} pageHeading={<PageHeading />}>
      <Carousel
        loading={isLoading}
        heading="Great first audiobooks"
        items={audiobooksData?.newAudiobooks.slice(0, 10) || []}
        onClick={handlePlay}
      />
      <Carousel
        loading={isLoading}
        heading="What's new"
        items={audiobooksData?.newAudiobooks.slice(10, 20) || []}
        onClick={handlePlay}
      />
      <Carousel
        loading={isLoading}
        heading="Buzzworthy"
        items={audiobooksData?.buzzAudiobooks || []}
        onClick={handlePlay}
      />
    </PageLayout>
  );
};

export default Audiobooks;
