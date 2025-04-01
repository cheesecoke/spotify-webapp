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
  overflow-x: auto;
  white-space: nowrap;
  gap: 20px;
`;

// TODO: Title links to a page
export const Title = styled.h2``;

const Carousel = ({ heading, items }: { heading?: string; items: [] }) => (
  <Container>
    {heading && (
      <Heading>
        <Title>{heading}</Title>
        <ChevronRightIcon />
      </Heading>
    )}
    <List>
      {items?.map((item: any, index: number) => (
        <Card
          key={index}
          imageUrl={item.image}
          imageAlt={item.trackTitle}
          title={item.trackTitle}
          description={item.artistName}
        />
      ))}
    </List>
  </Container>
);

export default Carousel;
