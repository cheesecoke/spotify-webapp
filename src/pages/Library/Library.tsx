import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
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
  justify-content: space-between;
  grid-column: span 2;
  grid-row: span 1;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  background: ${BluePurpleGradient};
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

const Library = () => {
  const { sdk } = useSpotify();
  const navigate = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [totalTracks, setTotalTracks] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<
    {
      id: string;
      owner?: string;
      name: string;
      image?: string;
      href?: string;
      description?: string;
      uri?: string;
    }[]
  >([]);

  useEffect(() => {
    const getPlaylists = async () => {
      setIsLoadingData(true);
      if (!sdk) return;
      try {
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

        setPlaylists(items);
        setTotalTracks(totalTracks);
      } catch (err) {
        console.error("Library error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    getPlaylists();
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
        {isLoadingData || !playlists || playlists.length === 0
          ? Array.from({ length: 20 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : playlists.map((item) => (
              <Card
                key={item.id}
                imageUrl={item.image}
                imageAlt={item.name}
                title={item.name}
                description={item.description}
                uri={item.uri}
                onClick={handlePlay}
              />
            ))}
      </Grid>
    </PageLayout>
  );
};

export default Library;
