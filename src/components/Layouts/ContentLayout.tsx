import React from "react";
import styled from "@emotion/styled";

export const OverFlowLayout = styled.main`
  padding: 20px 0px 0px 30px;
  overflow-x: hidden;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1400px) {
    padding: 20px 0 0 0;
  }
`;

export const BaseLayout = styled.main`
  padding: 20px 30px 0px 30px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1400px) {
    padding: 20px 0 0 0;
  }
`;

const Footer = styled.footer`
  padding: 20px 30px 0px 30px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1400px) {
    padding: 20px 0 0 0;
  }
`;

export const ContentLayout = ({
  pageHeading = null,
  overflow = true,
  topElement = null,
  children,
}: {
  pageHeading?: React.ReactNode;
  overflow?: boolean;
  topElement?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const Wrapper = overflow ? OverFlowLayout : BaseLayout;

  return (
    <>
      {pageHeading}
      {topElement}
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
};
