import {
  ItemWrapper,
  Image,
  RightWrapper,
  SkeletonImage,
  SkeletonRightWrapper,
} from "./HorizontalCard.styles";

const HorizontalCard = ({
  image,
  alt,
  content,
  loading,
  uri,
  onClick,
}: {
  image?: string;
  alt?: string;
  content?: any;
  uri?: string;
  loading?: boolean;
  onClick?: (uri: string) => void;
}) => {
  const SetImage = loading ? SkeletonImage : Image;
  const SetWrapper = loading ? SkeletonRightWrapper : RightWrapper;

  const handleClick = () => {
    console.log("Horizontal clicked");
    console.log("URI:", uri);
    if (onClick && uri) {
      onClick(uri);
    }
  };

  return (
    <ItemWrapper onClick={handleClick}>
      <SetImage src={image} alt={alt} />
      <SetWrapper>{content}</SetWrapper>
    </ItemWrapper>
  );
};

export default HorizontalCard;
