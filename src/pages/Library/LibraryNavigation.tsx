import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NightTextPrimary,
  NightTransparentPrimary,
  NightTransparentSecondary,
} from "styles/colors";

const Tabs = styled.div`
  display: flex;
  gap: 20px;
  margin: 0 30px 30px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ isActive: boolean }>`
  display: flex;
  flex: 1;
  padding: 17px 50px 17px 51px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ isActive }) =>
    isActive ? NightTransparentPrimary : NightTransparentSecondary};
  color: ${NightTextPrimary};
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${NightTransparentPrimary};
  }
`;

const TabData = [
  {
    name: "Playlists",
    route: "/library",
  },
  {
    name: "Podcasts",
    route: "/podcasts",
  },
  {
    name: "Audiobooks",
    route: "/audiobooks",
  },
  {
    name: "Artists",
    route: "/artists",
  },
  {
    name: "Albums",
    route: "/albums",
  },
];

const PageNavigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Tabs>
      {TabData.map((tab, index) => (
        <Tab
          key={index}
          onClick={() => navigate(tab.route)}
          isActive={pathname === tab.route}
        >
          {tab.name}
        </Tab>
      ))}
    </Tabs>
  );
};

export default PageNavigation;
