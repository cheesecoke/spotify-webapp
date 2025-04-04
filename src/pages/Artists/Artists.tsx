import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";

const Artists = () => {
  return (
    <PageLayout overflow={true} pageHeading={<PageHeading />}>
      <h1>Page Created - Artists</h1>
      <p>Welcome to your new page!</p>
    </PageLayout>
  );
};

export default Artists;
