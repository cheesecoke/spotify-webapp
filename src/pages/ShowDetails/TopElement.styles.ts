// TopElement.styles.ts
import styled from "@emotion/styled";
import {
  SpotifyGreen,
  NightTextSecondary,
  NightTransparentSecondary,
} from "styles/colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.4;
  justify-content: space-around;
  border-radius: 10px;
  background: ${NightTransparentSecondary};
  gap: 20px;
  padding: 30px;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  min-width: 0;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export const Heading = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const PodcastDescription = styled.p`
  white-space: normal;
  word-break: break-word;
  margin-bottom: 4px;
  color: ${NightTextSecondary};

  a {
    white-space: normal;
    word-break: break-word;
  }
`;

export const SubTitle = styled.h3`
  color: ${NightTextSecondary};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const DateTime = styled.div`
  font-size: 14px;
  color: var(--Night-Transparent-Secondary, rgba(255, 255, 255, 0.05));
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const PlayButton = styled.button`
  display: flex;
  height: 50px;
  padding: 10px 10px 10px 12px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 305px;
  background: ${SpotifyGreen};
  backdrop-filter: blur(30px);
`;

export const PauseButton = styled(PlayButton)`
  padding: 10px;
`;
