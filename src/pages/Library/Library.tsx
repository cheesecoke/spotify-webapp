import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useNavigateToPlayPage } from "hooks/useNavigateToPlayPage";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Card } from "components/Cards";
import { PlaylistArtists } from "assets/PlaylistArtists";
import { BluePurpleGradient } from "styles/colors";
import { Grid } from "components/Grid";

const LikedSongsCard = styled.a`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  grid-column: span 2;
  grid-row: span 1;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  background: ${BluePurpleGradient};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const LikedDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-end;
  align-items: flex-start;
  margin: 30px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

type PlaylistItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  uri: string;
};

const Library = () => {
  const { sdk } = useSpotify();
  const navigateToPlayPage = useNavigateToPlayPage();

  const { data: LibraryData, isLoading: isLoadingData } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      if (!sdk) return;

      const res = await sdk.currentUser.playlists.playlists();
      const items = res.items.map((playlist: any) => ({
        id: playlist.id,
        name: playlist.name,
        image: playlist.images?.[0]?.url || "",
        description: playlist.description || playlist.owner?.display_name,
        uri: playlist.uri,
      }));

      const resSavedTracks = await sdk.currentUser.tracks.savedTracks();
      const totalTracks = resSavedTracks.total;

      return { items, totalTracks };
    },
  });

  return (
    <PageLayout overflow={false} pageHeading={<PageHeading />}>
      <Grid>
        <LikedSongsCard
          as="a"
          href={"https://open.spotify.com/collection/tracks"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageWrapper>
            <PlaylistArtists />
          </ImageWrapper>
          <LikedDetails>
            <h1>Liked Songs</h1>
            <p>{LibraryData?.totalTracks} liked songs</p>
          </LikedDetails>
        </LikedSongsCard>
        {isLoadingData || !LibraryData || LibraryData.items.length === 0
          ? Array.from({ length: 20 }).map((_, index: number) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : LibraryData.items.map((item: PlaylistItem) => (
              <Card
                key={item.id}
                imageUrl={item.image}
                imageAlt={item.name}
                title={item.name}
                description={item.description}
                uri={item.uri}
                onClick={navigateToPlayPage}
              />
            ))}
      </Grid>
    </PageLayout>
  );
};

export default Library;
