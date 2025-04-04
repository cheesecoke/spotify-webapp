import PageLayout from "components/Layouts/PageLayout";
import PageHeading from "./PageHeading";


const Albums = () => {
  return (
    <PageLayout
      overflow={true}
      pageHeading={<PageHeading />}
      topElement={null}
    >
      <h1>Page Created - Albums</h1>
      <p>Welcome to your new page!</p>
    </PageLayout>
  );
};

export default Albums;
