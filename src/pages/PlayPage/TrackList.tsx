import { useSpotifyPlayer } from "context/PlayerProvider";
import { formatTime } from "utils";
import { MoreIcon, PlayIcon, PauseIcon } from "assets/icons";
import { NightTransparentSecondary } from "styles/colors";
import {
  TrackHeader,
  TrackWrapper,
  TrackListWrapper,
  LeftWrapper,
  RightWrapper,
  LeftContentWrapper,
  PlayButtonWrapper,
  PlayButton,
  PauseButton,
  IndexNumber,
} from "./Tracklist.styles";

const TrackList = ({
  items,
  onPlay,
  onPause,
}: {
  items: any;
  onPlay: (uri: string) => void;
  onPause: () => void;
}) => {
  const { currentlyPlayingUri, isPlaying } = useSpotifyPlayer();
  console.log("items::play", isPlaying);
  return (
    <TrackListWrapper>
      <TrackHeader
        style={{ borderBottom: `1px solid ${NightTransparentSecondary}` }}
      >
        <LeftWrapper># SONG</LeftWrapper>
        <RightWrapper>TIME</RightWrapper>
      </TrackHeader>
      {items.map((item: any, index: number) => {
        const isActive = currentlyPlayingUri === item.uri;
        return (
          <TrackWrapper
            key={item.id}
            onClick={() => {
              return isPlaying ? onPause() : onPlay(item.uri);
            }}
          >
            <LeftWrapper>
              <LeftContentWrapper>
                <PlayButtonWrapper isVisible={isActive}>
                  {isPlaying ? (
                    <PauseButton>
                      <PauseIcon width="20" height="20" />
                    </PauseButton>
                  ) : (
                    <PlayButton>
                      <PlayIcon width="20" height="20" />
                    </PlayButton>
                  )}
                </PlayButtonWrapper>
                <IndexNumber isHidden={isActive}>{index + 1}</IndexNumber>
                {item.title}
              </LeftContentWrapper>
            </LeftWrapper>

            <RightWrapper>
              {formatTime(item.time)}
              <MoreIcon style={{ marginLeft: "10px" }} />
            </RightWrapper>
          </TrackWrapper>
        );
      })}
    </TrackListWrapper>
  );
};

export default TrackList;
