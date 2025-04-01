import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";


const Podcasts = () => {
  return (
    <PageLayout
      overflow={false}
      pageHeading={<PageHeading />}
      topElement={null}
    >
      <h1>Page Created - Podcasts</h1>
      <p>Welcome to your new page!</p>
    </PageLayout>
  );
};

export default Podcasts;
