import React from "react";
import NavLeft from "./NavLeft";
import { useSpotify } from "hooks/useSpotify";
import {
  NavBarContainer,
  NavRight,
  ProfileContainer,
  Avatar,
  Name,
} from "./NavBar.styles";

const NavBar: React.FC = () => {
  const { user } = useSpotify();
  const displayName = user?.display_name || "Profile name";
  const avatarLetter = displayName ? displayName.charAt(0).toUpperCase() : "P";

  return (
    <NavBarContainer>
      <NavLeft />
      <NavRight>
        <ProfileContainer>
          <Avatar>{avatarLetter}</Avatar>
          <Name>{displayName}</Name>
        </ProfileContainer>
      </NavRight>
    </NavBarContainer>
  );
};

export default NavBar;
