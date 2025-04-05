import { css, keyframes } from "@emotion/react";
import { SkeletonBackground, SkeletonBackgroundLight } from "./colors";

const pulse = keyframes`
  0% {
    background-color: ${SkeletonBackground};
  }
  50% {
    background-color: ${SkeletonBackgroundLight};
  }
  100% {
    background-color: ${SkeletonBackground};
  }
`;

export const SkeletonAnimation = css`
  animation: ${pulse} 1.5s infinite;
`;
