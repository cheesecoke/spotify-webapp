import styled from "@emotion/styled";
import {
  NightTransparentSecondary,
  NightTransparentPrimary,
} from "styles/colors";

export const ForwardBackContainer = styled.div`
  display: flex;
  padding: 20px;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Button = styled.button`
  display: flex;
  width: 60px;
  height: 40px;
  padding: 8px 18px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${NightTransparentSecondary};
  cursor: pointer;

  &:hover {
    background: ${NightTransparentPrimary};
  }
`;
