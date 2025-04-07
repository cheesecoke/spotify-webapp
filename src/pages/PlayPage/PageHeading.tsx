import styled from "@emotion/styled";
import { HorizontalCard } from "components/Cards";
import { VerticalGradient } from "styles/colors";
import HeroContent from "./HeroContent";

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
