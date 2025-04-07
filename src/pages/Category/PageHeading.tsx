import styled from "@emotion/styled";

const Wrapper = styled.h1`
  margin: 0px 30px;
`;

const PageHeading = ({ title }: { title: string }) => {
  return <Wrapper>{title}</Wrapper>;
};

export default PageHeading;
