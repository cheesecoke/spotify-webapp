import styled from "@emotion/styled";
import { BaseLayout } from "components/Layouts/ContentLayout";
import HorizontalCard from "components/Cards/HorizontalCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
`;

const TopElement = ({ items }: { items: any }) => {
  return (
    <BaseLayout>
      <Grid>
        {items?.map((item: any, index: number) => (
          <HorizontalCard
            key={index}
            image={item.image}
            alt={item.trackTitle}
            content={<RightContent>{item.trackTitle}</RightContent>}
          />
        ))}
      </Grid>
    </BaseLayout>
  );
};

export default TopElement;
