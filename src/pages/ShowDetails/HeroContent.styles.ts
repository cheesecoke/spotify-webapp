import styled from "@emotion/styled";
import { NightTextPrimary, NightTransparentPrimary } from "styles/colors";

export const HeroContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  margin: 0 20px;
  gap: 10px;
  height: 100%;
`;

export const TypeText = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
`;

export const Title = styled.h1`
  font-size: 22px;
  text-align: left;
`;

export const SubText = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

export const Follow = styled.button`
  display: flex;
  width: 240px;
  height: 60px;
  padding: 17px 84px 17px 83px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 5px;
  border: 2px solid ${NightTransparentPrimary};
  color: ${NightTextPrimary};

  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
