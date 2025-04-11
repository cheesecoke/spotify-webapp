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
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  height: 100%;
  text-align: center;
`;

const TopElement = ({
  items,
  loading,
  onClick,
}: {
  items: any;
  loading?: boolean;
  onClick?: () => void;
}) => {
  return (
    <BaseLayout>
      <Grid>
        {loading || !items || items.length === 0
          ? Array.from({ length: 5 }).map((_, index) => (
              <HorizontalCard key={`skeleton-${index}`} loading />
            ))
          : items?.map((item: any, index: number) => (
              <HorizontalCard
                key={index}
                image={item.image}
                alt={item.imageAlt}
                content={<RightContent>{item.title}</RightContent>}
                uri={item.uri}
                onClick={onClick}
                isHeading={false}
              />
            ))}
      </Grid>
    </BaseLayout>
  );
};

export default TopElement;
