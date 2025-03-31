import React from "react";
import NavLeft from "./NavLeft";
import {
  NavBarContainer,
  NavRight,
  ProfileContainer,
  Avatar,
  Name,
} from "./NavBar.styles";

// TODO: Needs a responsive design.
const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <NavLeft />
      <NavRight>
        <ProfileContainer>
          <Avatar>P</Avatar>
          <Name>Profile name</Name>
        </ProfileContainer>
      </NavRight>
    </NavBarContainer>
  );
};

export default NavBar;
