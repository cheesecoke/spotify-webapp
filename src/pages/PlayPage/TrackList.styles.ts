import styled from "@emotion/styled";
import { NightTextSecondary, NightTextPrimary } from "styles/colors";
import { AnimatedOpacity } from "styles/animations";

export const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  position: relative;
`;

export const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
`;

export const PlayButton = styled.button`
  display: flex;
  height: 30px;
  padding: 7px 4px 7px 7px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 305px;
  background: #1ed760;
  backdrop-filter: blur(30px);
`;

export const PlayButtonWrapper = styled.div`
  display: none;
  position: absolute;
  left: 0px;
`;

export const IndexNumber = styled.span`
  display: block;
  position: absolute;
  left: 10px;
  color: ${NightTextSecondary};
`;

export const TrackHeader = styled.div`
  display: flex;
  flex-direction: row;
  color: ${NightTextSecondary};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const TrackWrapper = styled(TrackHeader)`
  color: ${NightTextPrimary};
  ${AnimatedOpacity}
  &:hover {
    background-color: #282828;
    cursor: pointer;
  }
  &:hover .play-button-wrapper {
    display: block;
  }
  &:hover .index-number {
    display: none;
  }
`;

export const LeftContentWrapper = styled.div`
  position: relative;
  padding-left: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TrackListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
