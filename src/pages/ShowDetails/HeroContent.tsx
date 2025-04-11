import {
  HeroContentWrapper,
  TypeText,
  Title,
  SubText,
  Follow,
} from "./HeroContent.styles";

const HeroContent = ({
  type,
  title,
  owner,
}: {
  type: string;
  title: string;
  artists?: string;
  owner?: string;
  likes?: number;
  total?: number;
  duration?: string;
}) => {
  return (
    <HeroContentWrapper>
      <TypeText>{type}</TypeText>
      <Title>{title}</Title>
      <SubText>{owner}</SubText>
      <Follow>Follow</Follow>
    </HeroContentWrapper>
  );
};

export default HeroContent;
