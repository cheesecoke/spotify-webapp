import { ItemWrapper, Image, RightWrapper } from "./HorizontalCard.styles";

const HorizontalCard = ({
  image,
  alt,
  content,
}: {
  image: string;
  alt: string;
  content: any;
}) => (
  <ItemWrapper>
    <Image src={image} alt={alt} />
    <RightWrapper>{content}</RightWrapper>
  </ItemWrapper>
);

export default HorizontalCard;
