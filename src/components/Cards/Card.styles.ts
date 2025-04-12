/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {
  NightTextPrimary,
  NightTextSecondary,
  SkeletonBackground,
} from "styles/colors";
import { SkeletonAnimation } from "styles/animations";

export const CardContainer = styled.div<{ flex?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ flex }) => (flex ? "100%" : "180px")};
  cursor: pointer;
  min-height: 229px;
  gap: 15px;
  align-items: ${({ flex }) => (flex ? "center" : "none")};

  @media (min-width: 1400px) {
    width: ${({ flex }) => (flex ? "100%" : "190px")};
  }

  @media (max-width: 1400px) {
    width: ${({ flex }) => (flex ? "100%" : "180px")};
  }

  @media (max-width: 1024px) {
    width: ${({ flex }) => (flex ? "100%" : "180px")};
  }

  @media (max-width: 768px) {
    width: ${({ flex }) => (flex ? "100%" : "160px")};
  }
`;

export const Image = styled.img<{ flex?: boolean }>`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
  align-self: ${({ flex }) => (flex ? "center" : "")};

  @media (min-width: 1400px) {
    width: 190px;
    height: 190px;
  }

  @media (max-width: 1400px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 1024px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`;

export const Section = styled.div`
  width: 100%;
`;

export const Title = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${NightTextPrimary};
`;

export const Text = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${NightTextSecondary};
`;

export const SkeletonImage = styled.div`
  width: 160px;
  height: 160px;
  background-color: ${SkeletonBackground};
  border-radius: 5px;
  ${SkeletonAnimation}
`;

export const SkeletonTitle = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${SkeletonBackground};
  border-radius: 5px;
  ${SkeletonAnimation}
`;

export const SkeletonText = styled(SkeletonTitle)`
  margin-top: 5px;
  width: 75%;
`;
