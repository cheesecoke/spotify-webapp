import PageNavigation from "pages/Library/LibraryNavigation";
import { BaseLayout } from "components/Layouts/ContentLayout";

const PageHeading = () => {
  return (
    <BaseLayout>
      <PageNavigation />
      <h1>Artists</h1>
    </BaseLayout>
  );
};

export default PageHeading;
