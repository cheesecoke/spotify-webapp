import styled from "@emotion/styled";
import { NightTextSecondary } from "styles/colors";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  text-align: left;
`;

export const Title = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 6px;
`;

export const Description = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  margin-bottom: 4px;
  color: ${NightTextSecondary};
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  flex-shrink: 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
