import { useSpotifyPlayer } from "context/PlayerProvider";
import { ChevronRightIcon, PlayIcon, PauseIcon } from "assets/icons";
import { BaseLayout } from "components/Layouts/ContentLayout";
import { Title } from "./HeroContent.styles";
import { Description } from "./CardContent.styles";
import {
  Wrapper,
  LeftWrapper,
  RightWrapper,
  Controls,
  SubTitle,
  Heading,
  PodcastDescription,
  PlayButton,
  PauseButton,
} from "./TopElement.styles";
import EpisodeProgress from "./EpisodeProgress";

const TopElement = ({
  lastestEpisode,
  showDescription,
  onPlay,
  onPause,
}: {
  lastestEpisode: any;
  showDescription: string;
  onPlay: (uri: string) => void;
  onPause: () => void;
}) => {
  const { isPlaying } = useSpotifyPlayer();

  return (
    <BaseLayout>
      <Wrapper>
        <LeftWrapper>
          <SubTitle>Latest episode</SubTitle>
          {lastestEpisode && <Title>{lastestEpisode.title}</Title>}
          {lastestEpisode && (
            <Description>{lastestEpisode.description}</Description>
          )}
          <Controls>
            {isPlaying ? (
              <PauseButton onClick={onPause}>
                <PauseIcon height="30" width="30" />
              </PauseButton>
            ) : (
              <PlayButton
                onClick={() => {
                  return onPlay(lastestEpisode.uri);
                }}
              >
                <PlayIcon height="30" width="30" />
              </PlayButton>
            )}
            <EpisodeProgress
              date={lastestEpisode && lastestEpisode.releaseDate}
              status={lastestEpisode && lastestEpisode.status}
              resumePoint={lastestEpisode && lastestEpisode.resumePoint}
              totalMs={lastestEpisode && lastestEpisode.totalMs}
            />
          </Controls>
        </LeftWrapper>
        <RightWrapper>
          <Heading>
            About <ChevronRightIcon />
          </Heading>
          <PodcastDescription>{showDescription}</PodcastDescription>
        </RightWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default TopElement;
