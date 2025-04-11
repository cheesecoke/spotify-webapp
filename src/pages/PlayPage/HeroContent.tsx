import styled from "@emotion/styled";
import { NightTextSecondary } from "styles/colors";

const HeroContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  margin: 0 20px;
  gap: 10px;
`;

const Type = styled.div`
  font-size: 12;
  text-transform: "uppercase";
  font-weight: 600;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: left;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${NightTextSecondary};
`;

const HeroContent = ({
  type,
  title,
  artists,
  owner,
  likes,
  total,
  duration,
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
      <Type>{type}</Type>
      <Title>{title}</Title>
      {artists && <Subtitle>With {artists} and more</Subtitle>}
      <Subtitle>
        {owner} • {likes?.toLocaleString()} likes • {total} songs • {duration}
      </Subtitle>
    </HeroContentWrapper>
  );
};

export default HeroContent;
