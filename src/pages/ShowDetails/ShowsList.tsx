import styled from "@emotion/styled";
import { ChevronDownIcon } from "assets/icons";
import { BaseLayout } from "components/Layouts/ContentLayout";
import { HorizontalCard } from "components/Cards";
import CardContent from "./CardContent";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Header = styled.h3`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
`;

interface ShowsListProps {
  shows: {
    image: string;
    title: string;
    uri: string;
    releaseDate: string;
    status: string;
    description: string;
    resumePoint: number;
    totalMs: number;
  }[];
  onPlay: (uri: string) => void;
}

const ShowsList: React.FC<ShowsListProps> = ({ shows, onPlay }) => {
  return (
    <BaseLayout>
      <Container>
        <Header>
          All Episodes <ChevronDownIcon />
        </Header>
        {shows.map((episode: any) => (
          <HorizontalCard
            image={episode.image}
            alt={episode.title}
            uri={episode.uri}
            onClick={() => onPlay(episode.uri)}
            content={
              <CardContent
                title={episode.title}
                date={episode.releaseDate}
                status={episode.status}
                description={episode.description}
                resumePoint={episode.resumePoint}
                totalMs={episode.totalMs}
              />
            }
            backgroundColor="transparent"
          />
        ))}
      </Container>
    </BaseLayout>
  );
};

export default ShowsList;
