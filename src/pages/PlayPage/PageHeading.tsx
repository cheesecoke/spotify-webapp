import { HorizontalCard } from "components/Cards";
import styled from "@emotion/styled";

const Wrapper = styled.h1`
  margin: 0px 30px;
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
        content={content}
      />
    </Wrapper>
  );
};

export default PageHeading;
