import {
  CardContainer,
  Section,
  Title,
  Text,
  Image,
  SkeletonImage,
  SkeletonTitle,
  SkeletonText,
} from "./Card.styles";

type CardProps = {
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  style?: React.CSSProperties;
  onClick?: (uri?: string) => void;
  uri?: string;
  loading?: boolean;
};

const Card = ({
  imageUrl = "",
  imageAlt,
  title,
  description,
  onClick,
  uri,
  loading,
}: CardProps) => {
  const SetImage = loading ? SkeletonImage : Image;
  const SetTitle = loading ? SkeletonTitle : Title;
  const SetText = loading ? SkeletonText : Text;

  const handleClick = () => {
    console.log("Card clicked");
    console.log("URI:", uri);
    if (onClick && uri) {
      onClick(uri);
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <SetImage src={imageUrl} alt={imageAlt} />
      <Section>
        <SetTitle>{title}</SetTitle>
        <SetText>{description}</SetText>
      </Section>
    </CardContainer>
  );
};

export default Card;
