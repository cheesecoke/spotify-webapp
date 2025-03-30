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
  height: 100px;
  padding: 1rem;
  background-color: ${NightBackgroundPrimary};
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// TODO: Profile Image.
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding: 4px;
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
  margin-right: 10px;
`;
