import styled from "@emotion/styled";
import {
  NightBackgroundPrimary,
  NightTextPrimary,
  NightTransparentSecondary,
} from "styles/colors";

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 30px;
  background-color: ${NightBackgroundPrimary};
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
`;

// TODO: Profile Image.
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin-left: 20px;
  gap: 10px;
  border-radius: 40px;
  color: ${NightTextPrimary};
  background-color: ${NightTransparentSecondary};
  font-size: 14px;
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: ${NightBackgroundPrimary};
  background-color: ${NightTextPrimary};
`;

export const Name = styled.span`
  display: flex;
  margin-right: 10px;

  @media (max-width: 780px) {
    display: none;
  }
`;
