/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { NightTextSecondary, SkeletonBackground } from "styles/colors";
import { SkeletonAnimation } from "styles/animations";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 15px;
  width: 180px;
  cursor: pointer;
  min-height: 250px;
`;

export const Image = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
`;

export const Section = styled.div``;

export const Title = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  width: 180px;
  height: 180px;
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
