import { formatTime } from "utils";
import { MoreIcon } from "assets/icons/MoreIcon";
import { PlayIcon } from "assets/icons/PlayIcon";
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
  IndexNumber,
} from "./Tracklist.styles";

const TrackList = ({ items }: { items: any }) => {
  console.log("items::tracks", typeof items);
  return (
    <TrackListWrapper>
      <TrackHeader
        style={{ borderBottom: `1px solid ${NightTransparentSecondary}` }}
      >
        <LeftWrapper># SONG</LeftWrapper>
        <RightWrapper>TIME</RightWrapper>
      </TrackHeader>
      {items.map((item: any, index: number) => (
        <TrackWrapper key={item.id}>
          <LeftWrapper>
            <LeftContentWrapper>
              <PlayButtonWrapper className="play-button-wrapper">
                <PlayButton>
                  <PlayIcon width="20" height="20" />
                </PlayButton>
              </PlayButtonWrapper>
              <IndexNumber className="index-number">{index + 1}</IndexNumber>
              {item.title}
            </LeftContentWrapper>
          </LeftWrapper>

          <RightWrapper>
            {formatTime(item.time)}
            <MoreIcon style={{ marginLeft: "10px" }} />
          </RightWrapper>
        </TrackWrapper>
      ))}
    </TrackListWrapper>
  );
};

export default TrackList;
