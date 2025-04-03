import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSpotify } from "hooks/useSpotify";
import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";
import { Card } from "components/Cards";
import { PlaylistArtists } from "assets/PlaylistArtists";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  padding-bottom: 40px;
`;

const LikedSongsCard = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-column: span 2;
  grid-row: span 1;
  border-radius: 5px;
  background: linear-gradient(118deg, #3d2aeb 14.12%, #898adf 97.08%);
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
  justify-content: center;
  margin-top: 30px;
`;

const Library = () => {
  const { sdk } = useSpotify();
  const [totalTracks, setTotalTracks] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<
    {
      id: string;
      owner?: string;
      name: string;
      image?: string;
      href?: string;
      description?: string;
    }[]
  >([]);

  useEffect(() => {
    const getPlaylists = async () => {
      if (!sdk) return;
      try {
        // TODO: Wrong Data
        const res = await sdk.playlists.getUsersPlaylists("me", 18);
        const items = res.items.map((playlist: any) => ({
          id: playlist.id,
          owner: playlist.owner?.display_name,
          name: playlist.name,
          image: playlist.images?.[0]?.url,
          href: playlist.external_urls?.spotify,
          description: playlist.description,
        }));

        const resSavedTracks = await sdk.currentUser.tracks.savedTracks();
        const totalTracks = resSavedTracks.total;

        setPlaylists(items);
        setTotalTracks(totalTracks);
      } catch (err) {
        console.error("Library error:", err);
      }
    };

    getPlaylists();
  }, [sdk]);

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
            <p>{totalTracks} liked songs</p>
          </LikedDetails>
        </LikedSongsCard>
        {playlists.map((item) => (
          <Card
            key={item.id}
            imageUrl={item.image || ""}
            imageAlt={item.name}
            title={item.name}
            description={item.description || item.owner}
          />
        ))}
      </Grid>
    </PageLayout>
  );
};

export default Library;
