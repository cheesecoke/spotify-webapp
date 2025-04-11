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
  backgroundColor,
}: {
  isHeading?: boolean;
  image?: string;
  alt?: string;
  content?: any;
  uri?: string;
  loading?: boolean;
  onClick?: (uri: string) => void;
  backgroundColor?: string;
}) => {
  const SetImage = loading ? SkeletonImage : Image;
  const SetWrapper = loading ? SkeletonRightWrapper : RightWrapper;

  const handleClick = () => {
    if (onClick && uri) {
      onClick(uri);
    }
  };

  return (
    <ItemWrapper
      onClick={handleClick}
      isHeading={isHeading}
      backgroundColor={backgroundColor}
    >
      <SetImage {...{ src: image, alt, isHeading }} />
      <SetWrapper {...{ isHeading }}>{content}</SetWrapper>
    </ItemWrapper>
  );
};

export default HorizontalCard;
