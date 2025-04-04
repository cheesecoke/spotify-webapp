import styled from "@emotion/styled";
import PageNavigation from "../../components/PageNavigation";

export const Heading = styled.h1`
  margin: 0 30px;
`;

const PageHeading = () => {
  return (
    <>
      <PageNavigation />
      <Heading>Playlist</Heading>
    </>
  );
};

export default PageHeading;
