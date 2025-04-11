import styled from "@emotion/styled";
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
      <h1 style={{ fontSize: 32, textAlign: "left" }}>{title}</h1>
      {artists && (
        <p style={{ fontSize: 14, color: "#aaa" }}>With {artists} and more</p>
      )}
      <p style={{ fontSize: 14, color: "#aaa" }}>
        {owner} • {likes?.toLocaleString()} likes • {total} songs • {duration}
      </p>
    </HeroContentWrapper>
  );
};

export default HeroContent;
