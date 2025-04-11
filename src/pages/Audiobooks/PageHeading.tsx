import PageNavigation from "pages/Library/LibraryNavigation";
import { BaseLayout } from "components/Layouts/ContentLayout";

const PageHeading = () => {
  return (
    <BaseLayout>
      <PageNavigation />
      <h1>Audiobooks</h1>
    </BaseLayout>
  );
};

export default PageHeading;
