import styled from "@emotion/styled";
import PageNavigation from "pages/Library/LibraryNavigation";

const Wrapper = styled.h1`
  margin: 0px 30px;
`;

const PageHeading = () => {
  return (
    <>
      <PageNavigation />
      <Wrapper>Audiobooks</Wrapper>;
    </>
  );
};

export default PageHeading;
