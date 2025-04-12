import styled from "@emotion/styled";
import { NightTransparentSecondary, SkeletonBackground } from "styles/colors";
import { SkeletonAnimation } from "styles/animations";

export const ItemWrapper = styled.div<{
  isHeading?: boolean;
  backgroundColor?: string;
}>`
  display: flex;
  width: 100%;
  max-height: ${({ isHeading }) => (isHeading ? "100%" : "360px")};
  flex-direction: row;
  box-sizing: border-box;
  background-color: ${({ isHeading, backgroundColor }) =>
    isHeading
      ? "transparent"
      : backgroundColor
        ? backgroundColor
        : NightTransparentSecondary};
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
  cursor: ${({ isHeading }) => (isHeading ? "default" : "pointer")};
`;

export const Image = styled.img<{ isHeading?: boolean }>`
  display: flex;
  width: ${({ isHeading }) => (isHeading ? "" : "100px")};
  height: ${({ isHeading }) => (isHeading ? "auto" : "100px")};
  max-height: ${({ isHeading }) => (isHeading ? "208px" : "100px")};
  flex-shrink: 0;
  border-radius: 5px 0px 0px 5px;
`;

export const RightWrapper = styled.div<{ isHeading?: boolean }>`
  width: 100%;
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
