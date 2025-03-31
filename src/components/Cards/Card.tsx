import {
  CardContainer,
  Description,
  CardTitle,
  Text,
  Image,
} from "./Card.styles";

const Card = ({ key, item }: { key: any; item: any }) => (
  <CardContainer key={key}>
    <Image src={item.image} alt={item.trackTitle} />
    <Description>
      <CardTitle>{item.trackTitle}</CardTitle>
      <Text>{item.artistName}</Text>
    </Description>
  </CardContainer>
);

export default Card;
