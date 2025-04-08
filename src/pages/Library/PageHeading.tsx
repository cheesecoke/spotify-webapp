import LibraryNavigation from "./LibraryNavigation";
import { BaseLayout } from "components/Layouts/ContentLayout";

const PageHeading = () => {
  return (
    <BaseLayout>
      <LibraryNavigation />
      <h1>Playlist</h1>
    </BaseLayout>
  );
};

export default PageHeading;
