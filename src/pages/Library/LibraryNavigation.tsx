import styled from "@emotion/styled";
import {
  NightTransparentPrimary,
  NightTransparentSecondary,
} from "styles/colors";

const Tabs = styled.div`
  display: flex;
  gap: 20px;
  margin: 0 30px 30px;
`;

const Tab = styled.div`
  display: flex;
  flex: 1;
  padding: 17px 50px 17px 51px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${NightTransparentSecondary};
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${NightTransparentPrimary};
  }
`;

const TabData = [
  {
    name: "Playlists",
    route: "/playlists",
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

const LibraryNavigation = () => {
  return (
    <Tabs>
      {TabData.map((tab, index) => (
        <Tab key={index}>{tab.name}</Tab>
      ))}
    </Tabs>
  );
};

export default LibraryNavigation;
