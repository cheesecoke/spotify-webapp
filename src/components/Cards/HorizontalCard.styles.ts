import styled from "@emotion/styled";
import { NightTransparentSecondary, SkeletonBackground } from "styles/colors";
import { SkeletonAnimation } from "styles/animations";

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 360px;
  flex-direction: row;
  box-sizing: border-box;
  background-color: #f0f0f0;
  text-align: center;
  border-radius: 5px;
  background-color: ${NightTransparentSecondary};
  overflow: hidden;
  cursor: pointer;
`;

export const Image = styled.img`
  display: flex;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 5px 0px 0px 5px;
`;

export const RightWrapper = styled.div`
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

export const SkeletonRightWrapper = styled.div`
  flex: 1;
  background-color: ${SkeletonBackground};
  border-radius: 0px 5px 5px 0px;
  ${SkeletonAnimation}
`;
