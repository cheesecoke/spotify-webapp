import { useLocation, useNavigate } from "react-router-dom";
import { Container, Item } from "./PageNavigation.styles";

const PageNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Browse", path: "/browse" },
    { label: "Library", path: "/library" },
  ];

  return (
    <Container>
      {navItems.map(({ label, path }) => (
        <Item
          key={label}
          isActive={location.pathname === path}
          onClick={() => navigate(path)}
        >
          {label}
        </Item>
      ))}
    </Container>
  );
};

export default PageNavigation;
