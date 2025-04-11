import styled from "@emotion/styled";
import {
  NightTextSecondary,
  NightTextPrimary,
  SpotifyGreen,
  SkeletonBackground,
} from "styles/colors";
import { AnimatedOpacity } from "styles/animations";

export const LeftWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  gap: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;

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

export const RightWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
`;

export const PlayButton = styled.button`
  display: flex;
  height: 34px;
  padding: 10px 7px 10px 8px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 305px;
  background: ${SpotifyGreen};
  backdrop-filter: blur(30px);
`;

export const PauseButton = styled(PlayButton)`
  padding: 10px 7px 10px 7px;
`;

export const PlayButtonWrapper = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  left: 0px;
`;

export const IndexNumber = styled.span<{ isHidden: boolean }>`
  display: ${({ isHidden }) => (isHidden ? "none" : "block")};
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

export const TrackListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const DropdownContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: absolute;
  top: 45px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
  padding: 20px 20px 20px 20px;
  background-color: ${SkeletonBackground};
  border-radius: 5px;
  z-index: 2;
  ${AnimatedOpacity}
`;

export const Item = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${NightTextPrimary};
  cursor: pointer;

  &:hover {
    color: ${NightTextSecondary};
  }

  @media (max-width: 840px) {
    padding: 0px;
  }
`;
