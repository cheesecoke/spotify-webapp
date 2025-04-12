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
  responsive = false,
}: {
  isHeading?: boolean;
  image?: string;
  alt?: string;
  content?: any;
  uri?: string;
  loading?: boolean;
  onClick?: (uri: string) => void;
  backgroundColor?: string;
  responsive?: boolean;
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
      responsive={responsive}
    >
      <SetImage {...{ src: image, alt, isHeading, responsive }} />
      <SetWrapper {...{ isHeading }}>{content}</SetWrapper>
    </ItemWrapper>
  );
};

export default HorizontalCard;
