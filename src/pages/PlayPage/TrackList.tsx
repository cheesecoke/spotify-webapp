import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpotifyPlayer } from "context/PlayerProvider";
import { formatTime } from "utils";
import { MoreIcon, PlayIcon, PauseIcon } from "assets/icons";
import { NightTransparentSecondary } from "styles/colors";
import {
  TrackHeader,
  TrackListWrapper,
  ItemWrapper,
  LeftWrapper,
  RightWrapper,
  PlayButtonWrapper,
  PlayButton,
  PauseButton,
  IndexNumber,
  DropdownContainer,
  Item,
} from "./TrackList.styles";

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
  const navigate = useNavigate();
  const [isOpenIndex, setIsOpenIndex] = useState<number | null>(null);

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
          <ItemWrapper key={item.id}>
            <LeftWrapper
              key={item.id}
              onClick={() => {
                return isPlaying ? onPause() : onPlay(item.uri);
              }}
            >
              <PlayButtonWrapper isVisible={isActive}>
                {isActive && isPlaying ? (
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
            </LeftWrapper>
            <RightWrapper>
              {formatTime(item.time)}
              <MoreIcon
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => {
                  setIsOpenIndex(isOpenIndex === index ? null : index);
                }}
              />
              <DropdownContainer isOpen={isOpenIndex === index}>
                <Item
                  onFocus={() => setIsOpenIndex(index)}
                  onBlur={() => setIsOpenIndex(null)}
                  onClick={() => {
                    navigate(`/episode/${item.id}`);
                    setIsOpenIndex(index);
                  }}
                >
                  Details
                </Item>
              </DropdownContainer>
            </RightWrapper>
          </ItemWrapper>
        );
      })}
    </TrackListWrapper>
  );
};

export default TrackList;
