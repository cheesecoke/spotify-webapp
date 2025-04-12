import styled from "@emotion/styled";
import {
  NightTextSecondary,
  NightTransparentPrimary,
  NightTextPrimary,
  SkeletonBackground,
} from "styles/colors";
import { AnimatedOpacity } from "styles/animations";

export const HamburgerIconWrapper = styled.div`
  cursor: pointer;
`;

export const Item = styled.div<{ isActive: boolean }>`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${({ isActive }) =>
    isActive ? NightTextPrimary : NightTransparentPrimary};
  cursor: pointer;

  &:hover {
    color: ${NightTextSecondary};
  }

  @media (max-width: 840px) {
    padding: 0px;
  }
`;

export const MobileMenu = styled.div`
  display: none;

  @media (max-width: 900px) {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

export const DropdownContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: absolute;
  top: 45px;
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

export const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  padding: 0 20px;

  @media (max-width: 900px) {
    display: none;
  }
`;
