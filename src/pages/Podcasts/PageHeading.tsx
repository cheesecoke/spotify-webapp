import PageNavigation from "pages/Library/LibraryNavigation";
import { BaseLayout } from "components/Layouts/ContentLayout";

const PageHeading = () => {
  return (
    <BaseLayout>
      <PageNavigation />
      <h1>Podcasts</h1>
    </BaseLayout>
  );
};

export default PageHeading;
