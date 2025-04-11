import { useSpotifyPlayer } from "context/PlayerProvider";
import { ChevronRightIcon, MoreIcon, PlayIcon, PauseIcon } from "assets/icons";
import { BaseLayout } from "components/Layouts/ContentLayout";
import { Title } from "./HeroContent.styles";
import { Description } from "./CardContent.styles";
import {
  Wrapper,
  LeftWrapper,
  RightWrapper,
  Controls,
  DateTime,
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
          <Title>{lastestEpisode.title}</Title>
          <Description>{lastestEpisode.description}</Description>
          <Controls>
            {isPlaying ? (
              <PauseButton onClick={onPause}>
                <PauseIcon height="30" width="30" />
              </PauseButton>
            ) : (
              <PlayButton
                onClick={() => {
                  console.log("Playing episode:", lastestEpisode.uri);
                  return onPlay(lastestEpisode.uri);
                }}
              >
                <PlayIcon height="30" width="30" />
              </PlayButton>
            )}
            <EpisodeProgress
              date={lastestEpisode.releaseDate}
              status={lastestEpisode.status}
              resumePoint={lastestEpisode.resumePoint}
              totalMs={lastestEpisode.totalMs}
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
