import styled from "@emotion/styled";
import { ChevronRightIcon } from "assets/icons";
import Card from "./Cards/Card";

export const Container = styled.div`
  padding: 30px 0px 0px 0px;
`;

export const Heading = styled.div`
  display: flex;
  height: 17px;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
`;

export const List = styled.div`
  display: flex;
  min-height: 229px;
  overflow-x: auto;
  white-space: nowrap;
  gap: 20px;
`;

// TODO: Title links to a page
export const Title = styled.h2``;

type CarouselProps = {
  heading?: string;
  items: any[];
  onClick?: (uri?: string) => void;
  loading?: boolean;
};

const Carousel = ({ heading, items, onClick, loading }: CarouselProps) => {
  return (
    <Container>
      {heading && (
        <Heading>
          <Title>{heading}</Title>
          <ChevronRightIcon />
        </Heading>
      )}
      <List>
        {loading || !items || items.length === 0
          ? Array.from({ length: 5 }).map((_, index) => (
              <Card key={`skeleton-${index}`} loading />
            ))
          : items.map((item: any, index: number) => (
              <Card
                key={index}
                imageUrl={item.image}
                imageAlt={item.imageAlt}
                title={item.title}
                description={item.description}
                uri={item.uri}
                onClick={onClick}
              />
            ))}
      </List>
    </Container>
  );
};

export default Carousel;
