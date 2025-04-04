import styled from "@emotion/styled";
import PageNavigation from "components/PageNavigation";

const Wrapper = styled.h1`
  margin: 0px 30px;
`;

const PageHeading = () => {
  return (
    <>
      <PageNavigation />
      <Wrapper>Albums</Wrapper>;
    </>
  );
};

export default PageHeading;
