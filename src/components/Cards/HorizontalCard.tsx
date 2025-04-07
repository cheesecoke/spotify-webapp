import {
  ItemWrapper,
  Image,
  RightWrapper,
  SkeletonImage,
  SkeletonRightWrapper,
} from "./HorizontalCard.styles";

const HorizontalCard = ({
  isHeading = false,
  image,
  alt,
  content,
  loading,
  uri,
  onClick,
}: {
  isHeading?: boolean;
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
    if (onClick && uri) {
      onClick(uri);
    }
  };

  return (
    <ItemWrapper onClick={handleClick} isHeading={isHeading}>
      <SetImage {...{ src: image, alt, isHeading }} />
      <SetWrapper {...{ isHeading }}>{content}</SetWrapper>
    </ItemWrapper>
  );
};

export default HorizontalCard;
