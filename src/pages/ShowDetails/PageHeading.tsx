import styled from "@emotion/styled";
import { HorizontalCard } from "components/Cards";
import { GradientTwo, GradientTwoBoxShadow } from "styles/colors";
import HeroContent from "./HeroContent";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 268px;
  padding: 0 30px;
  margin: 0;
  background: ${GradientTwo};
  box-shadow: ${GradientTwoBoxShadow};
`;

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1400px) {
    padding: 0;
  }
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
      <Container>
        <HorizontalCard
          isHeading={true}
          image={image}
          alt={alt}
          content={<HeroContent {...content} />}
        />
      </Container>
    </Wrapper>
  );
};

export default PageHeading;
