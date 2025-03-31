import React from "react";
import { NavBar } from "components/NavBar";
import { ContentLayout } from "./ContentLayout";

const PageLayout: React.FC<{
  pageHeading?: React.ReactNode;
  topElement?: React.ReactNode;
  children: React.ReactNode;
}> = ({ pageHeading, topElement, children }) => {
  return (
    <>
      <NavBar />
      <ContentLayout pageHeading={pageHeading} topElement={topElement}>
        {children}
      </ContentLayout>
    </>
  );
};

export default PageLayout;
