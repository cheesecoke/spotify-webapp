import { CardContainer, Description, Title, Text, Image } from "./Card.styles";

type CardProps = {
  imageUrl: string;
  imageAlt: string;
  title?: string;
  description?: string;
  style?: React.CSSProperties;
  onClick?: (uri?: string) => void;
  uri?: string;
};

const Card = ({
  imageUrl = "",
  imageAlt,
  title,
  description,
  style,
  onClick,
  uri,
}: CardProps) => {
  const handleClick = () => {
    console.log("Card clicked");
    console.log("URI:", uri);
    if (onClick && uri) {
      onClick(uri);
    }
  };

  return (
    <CardContainer style={style} onClick={handleClick}>
      <Image src={imageUrl} alt={imageAlt} />
      <Description>
        <Title>{title}</Title>
        <Text>{description}</Text>
      </Description>
    </CardContainer>
  );
};

export default Card;
