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
  flex?: boolean;
};

const Card = ({
  imageUrl = "",
  imageAlt,
  title,
  description,
  onClick,
  uri,
  loading,
  flex = true,
}: CardProps) => {
  const SetImage = loading ? SkeletonImage : Image;
  const SetTitle = loading ? SkeletonTitle : Title;
  const SetText = loading ? SkeletonText : Text;

  const handleClick = () => {
    if (onClick && uri) {
      onClick(uri);
    }
  };

  return (
    <CardContainer onClick={handleClick} flex={flex}>
      <SetImage src={imageUrl} alt={imageAlt} />
      <Section>
        <SetTitle>{title}</SetTitle>
        <SetText>{description}</SetText>
      </Section>
    </CardContainer>
  );
};

export default Card;
