import styled from "@emotion/styled";
import {
  NightTextPrimary,
  NightTextSecondary,
  SkeletonBackground,
} from "styles/colors";
import { AnimatedOpacity } from "styles/animations";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SearchIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 0 20px 0;
  gap: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Settings = styled.div`
  display: flex;
  position: relative;
  padding: 20px 16px;
  align-items: center;
  cursor: pointer;
`;

export const DropdownContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: absolute;
  top: 80px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
  padding: 20px 20px 20px 20px;
  background-color: ${SkeletonBackground};
  border-radius: 5px;
  z-index: 2;

  ${AnimatedOpacity}
`;

export const SignOutButton = styled.div`
  width: 65px;
  color: ${NightTextSecondary};
  &:hover {
    color: ${NightTextPrimary};
  }
`;

export const HideMobile = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
