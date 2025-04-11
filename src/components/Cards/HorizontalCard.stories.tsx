import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import HorizontalCard from "./HorizontalCard";
import HeroContent from "@/pages/PlayPage/HeroContent";

const content = {
  type: "Artist",
  title: "Spring Vibes",
  artists: "Sleepy Fish, The Weeknd, Drake",
  owner: "Sam Fisher",
  likes: 22,
  total: 10,
  duration: null,
};

const Wrapper = styled.div`
  width: 300px;
`;
const RightContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  text-align: left;
  width: 200px;
`;

const meta: Meta<typeof HorizontalCard> = {
  component: HorizontalCard,
  title: "Cards/HorizontalCard",
};

export default meta;
type Story = StoryObj<typeof HorizontalCard>;

export const Regular: Story = {
  args: {
    image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    alt: "Example Album",
    loading: false,
  },
  render: (args) => (
    <Wrapper>
      <HorizontalCard
        {...args}
        content={<RightContent>{content.title}</RightContent>}
      />
    </Wrapper>
  ),
};

export const AsHeading: Story = {
  args: {
    isHeading: true,
    image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    alt: "Spring Vibes",
    content: <HeroContent {...content} />,
  },
  render: (args) => <HorizontalCard {...args} />,
};
