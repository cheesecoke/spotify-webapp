import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "Cards/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    imageAlt: "Placeholder Image",
    title: "Spring Vibes",
    description: "A playlist to chill out and enjoy spring vibes.",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    imageAlt: "Placeholder Image",
    title: "Spring Vibes",
    description: "A playlist to chill out and enjoy spring vibes.",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    imageUrl: undefined,
    imageAlt: undefined,
    title: undefined,
    description: undefined,
  },
};
