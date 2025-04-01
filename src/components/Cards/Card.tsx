import { CardContainer, Description, Title, Text, Image } from "./Card.styles";

const Card = ({
  key,
  imageUrl = "", // Create a placeholder image URL
  imageAlt,
  title,
  description,
  style,
}: {
  key: any;
  imageUrl: string;
  imageAlt: string;
  title?: string;
  description?: string;
  style?: React.CSSProperties;
}) => (
  <CardContainer key={key} style={style}>
    <Image src={imageUrl} alt={imageAlt} />
    <Description>
      <Title>{title}</Title>
      <Text>{description}</Text>
    </Description>
  </CardContainer>
);

export default Card;
