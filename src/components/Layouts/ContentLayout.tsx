import React from "react";
import styled from "@emotion/styled";

export const OverFlowLayout = styled.main`
  padding: 20px 0px 40px 30px;
  overflow-x: hidden;
`;

export const BaseLayout = styled.main`
  padding: 20px 30px 40px 30px;
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
    </>
  );
};
