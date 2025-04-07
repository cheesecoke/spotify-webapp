import styled from "@emotion/styled";
import { NightTransparentSecondary, SkeletonBackground } from "styles/colors";
import { SkeletonAnimation } from "styles/animations";

export const ItemWrapper = styled.div<{ isHeading?: boolean }>`
  display: flex;
  width: 100%;
  max-height: ${({ isHeading }) => (isHeading ? "100%" : "360px")};
  flex-direction: row;
  box-sizing: border-box;
  background-color: ${({ isHeading }) =>
    isHeading ? "transparent" : NightTransparentSecondary};
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
  cursor: ${({ isHeading }) => (isHeading ? "default" : "pointer")};
`;

export const Image = styled.img<{ isHeading?: boolean }>`
  display: flex;
  width: ${({ isHeading }) => (isHeading ? "fit-content" : "100px")};
  height: ${({ isHeading }) => (isHeading ? "auto" : "100px")};
  max-height: ${({ isHeading }) => (isHeading ? "208px" : "100px")};
  flex-shrink: 0;
  border-radius: 5px 0px 0px 5px;
`;

export const RightWrapper = styled.div<{ isHeading?: boolean }>`
  flex: 1;
  display: flex;
  color: white;
`;

export const SkeletonImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${SkeletonBackground};
  border-radius: 5px 0px 0px 5px;a
  ${SkeletonAnimation}
`;

export const SkeletonRightWrapper = styled.div<{ isHeading?: boolean }>`
  flex: 1;
  background-color: ${SkeletonBackground};
  border-radius: 0px 5px 5px 0px;
  ${SkeletonAnimation}
`;
