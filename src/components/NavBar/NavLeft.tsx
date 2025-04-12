import React, { useState } from "react";
import PageNavigation from "./PageNavigation";
import ForwardBack from "./ForwardBack";
import {
  ChevronDownIcon,
  SearchIcon,
  DividerIcon,
  Spotify,
} from "assets/icons";
import {
  Container,
  SearchIconContainer,
  Settings,
  DropdownContainer,
  SignOutButton,
  HideMobile,
} from "./NavLeft.styles";

const NavLeft = () => {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    localStorage.clear();
    window.location.href = "/login";
  };

  console.log(isSignOutOpen);

  return (
    <Container>
      <SearchIconContainer>
        <SearchIcon />
      </SearchIconContainer>
      <HideMobile>
        <DividerIcon />
      </HideMobile>
      <Settings onClick={() => setIsSignOutOpen(!isSignOutOpen)}>
        <Spotify />
        <ChevronDownIcon />
        {isSignOutOpen && (
          <DropdownContainer isOpen={isSignOutOpen}>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </DropdownContainer>
        )}
      </Settings>
      <HideMobile>
        <DividerIcon />
      </HideMobile>
      <ForwardBack />
      <DividerIcon />
      <PageNavigation />
    </Container>
  );
};

export default NavLeft;
