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
}: {
  image: string;
  alt: string;
  content: any;
  loading?: boolean;
}) => {
  const SetImage = loading ? SkeletonImage : Image;
  const SetWrapper = loading ? SkeletonRightWrapper : RightWrapper;

  return (
    <ItemWrapper>
      <SetImage src={image} alt={alt} />
      <SetWrapper>{content}</SetWrapper>
    </ItemWrapper>
  );
};

export default HorizontalCard;
