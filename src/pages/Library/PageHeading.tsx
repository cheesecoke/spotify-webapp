import styled from "@emotion/styled";
import LibraryNavigation from "./LibraryNavigation";

export const Heading = styled.h1`
  margin: 0 30px;
`;

const PageHeading = () => {
  return (
    <>
      <LibraryNavigation />
      <Heading>Playlist</Heading>
    </>
  );
};

export default PageHeading;
