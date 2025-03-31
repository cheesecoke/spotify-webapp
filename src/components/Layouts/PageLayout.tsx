import React from "react";
import { NavBar } from "components/NavBar";
import { ContentLayout } from "./ContentLayout";

const PageLayout: React.FC<{
  overflow?: boolean;
  pageHeading?: React.ReactNode;
  topElement?: React.ReactNode;
  children: React.ReactNode;
}> = ({ overflow, pageHeading = null, topElement = null, children }) => {
  return (
    <>
      <NavBar />
      <ContentLayout
        overflow={overflow}
        pageHeading={pageHeading}
        topElement={topElement}
      >
        {children}
      </ContentLayout>
    </>
  );
};

export default PageLayout;
