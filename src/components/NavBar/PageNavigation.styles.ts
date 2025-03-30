import styled from "@emotion/styled";
import {
  NightTextSecondary,
  NightTransparentPrimary,
  NightTextPrimary,
} from "styles/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0 30px;
`;

export const Item = styled.div<{ isActive: boolean }>`
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${({ isActive }) =>
    isActive ? NightTextPrimary : NightTransparentPrimary};
  cursor: pointer;

  &:hover {
    color: ${NightTextSecondary};
  }
`;
