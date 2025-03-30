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
  DropdownContainer,
} from "./NavLeft.styles";

const NavLeft = () => (
  <Container>
    <SearchIconContainer>
      <SearchIcon />
    </SearchIconContainer>
    <DividerIcon />
    <DropdownContainer>
      <Spotify />
      <ChevronDownIcon />
    </DropdownContainer>
    <DividerIcon />
    <ForwardBack />
    <DividerIcon />
    <PageNavigation />
  </Container>
);

export default NavLeft;
