import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Item,
  MobileMenu,
  HamburgerIconWrapper,
  DesktopMenu,
  DropdownContainer,
} from "./PageNavigation.styles";
import { HamburgerIcon } from "assets/icons";

const PageNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Browse", path: "/browse" },
    { label: "Library", path: "/library" },
  ];

  return (
    <div>
      <MobileMenu>
        <HamburgerIconWrapper onClick={() => setIsOpen(!isOpen)}>
          <HamburgerIcon />
        </HamburgerIconWrapper>
        <DropdownContainer isOpen={isOpen}>
          {navItems.map(({ label, path }) => (
            <Item
              key={label}
              isActive={location.pathname === path}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
              onClick={() => {
                navigate(path);
                setIsOpen(true);
              }}
            >
              {label}
            </Item>
          ))}
        </DropdownContainer>
      </MobileMenu>

      <DesktopMenu>
        {navItems.map(({ label, path }) => (
          <Item
            key={label}
            isActive={location.pathname === path}
            onClick={() => navigate(path)}
          >
            {label}
          </Item>
        ))}
      </DesktopMenu>
    </div>
  );
};

export default PageNavigation;
