import styled from "@emotion/styled";
import { HorizontalCard } from "components/Cards";
import { VerticalGradient } from "styles/colors";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 268px;
  padding: 0 30px;
  margin: 0;
  background: ${VerticalGradient};
  box-shadow: 0px 150px 200px 0px rgba(49, 109, 166, 0.15);
`;

const HeroContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  margin: 0 20px;
  gap: 10px;
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
      <div
        style={{ fontSize: 12, textTransform: "uppercase", fontWeight: 600 }}
      >
        {type}
      </div>
      <h1 style={{ fontSize: 32 }}>{title}</h1>
      {artists && (
        <p style={{ fontSize: 14, color: "#aaa" }}>With {artists} and more</p>
      )}
      <p style={{ fontSize: 14, color: "#aaa" }}>
        {owner} • {likes?.toLocaleString()} likes • {total} songs • {duration}
      </p>
    </HeroContentWrapper>
  );
};

const PageHeading = ({
  image,
  alt,
  content,
}: {
  image: string;
  alt: string;
  content: any;
}) => {
  return (
    <Wrapper>
      <HorizontalCard
        isHeading={true}
        image={image}
        alt={alt}
        content={<HeroContent {...content} />}
      />
    </Wrapper>
  );
};

export default PageHeading;
