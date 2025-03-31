import { NightTextSecondary } from "styles/colors";
import styled from "@emotion/styled";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 15px;
  width: 180px;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
`;

export const Description = styled.div``;

export const CardTitle = styled.h3`
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

  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${NightTextSecondary};
`;
