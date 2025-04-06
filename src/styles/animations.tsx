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

const keyFramesOpacity = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedOpacity = css`
  animation: ${keyFramesOpacity} 0.3s ease-in-out;
`;

const keyFramesEaseInOpacity = keyframes`
  from {
    opacity: 0;
    // transform: translateY(-10px);
  }
  to {
    opacity: 1;
    // transform: translateY(0);
  }
`;

export const EaseInOpacity = css`
  animation: ${keyFramesEaseInOpacity} 0.2s ease-in;
`;
