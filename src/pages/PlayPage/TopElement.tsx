import styled from "@emotion/styled";
import { useSpotifyPlayer } from "context/PlayerProvider";
import { PlayIcon, PauseIcon, MoreIcon } from "assets/icons";
import { ShuffleIcon } from "assets/icons/ShuffleIcon";
import {
  NightTransparentSecondary,
  NightTransparentPrimary,
  SpotifyGreen,
} from "styles/colors";

const Wrapper = styled.h1`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px 30px 0px 30px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1400px) {
    padding: 20px 0 0 0;
  }
`;

const PlayButton = styled.button`
  display: flex;
  height: 40px;
  padding: 10px 4px 10px 7px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 305px;
  background: ${SpotifyGreen};
  backdrop-filter: blur(30px);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 2px solid ${NightTransparentSecondary};
  cursor: pointer;

  &:hover {
    background: ${NightTransparentPrimary};
  }
`;

const PauseButton = styled(PlayButton)`
  padding: 10px 5px 10px 5px;
`;

const TopElement = ({
  onPlay,
  onPause,
  onShuffle,
  onMore,
}: {
  onPlay: () => void;
  onPause: () => void;
  onShuffle: () => void;
  onMore: () => void;
}) => {
  const { isPlaying } = useSpotifyPlayer();
  return (
    <Wrapper>
      {isPlaying ? (
        <PauseButton onClick={onPause}>
          <PauseIcon height="30" width="30" />
        </PauseButton>
      ) : (
        <PlayButton onClick={onPlay}>
          <PlayIcon height="30" width="30" />
        </PlayButton>
      )}

      <ButtonWrapper onClick={onShuffle}>
        <ShuffleIcon height="30" width="30" />
      </ButtonWrapper>
      <ButtonWrapper onClick={onMore}>
        <MoreIcon height="30" width="30" />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default TopElement;
