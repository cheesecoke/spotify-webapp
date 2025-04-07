import type { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import PageLayout from "./PageLayout";

export default {
  title: "Layout/PageLayout",
  component: PageLayout,
  argTypes: {
    overflow: { control: "boolean" },
  },
} as Meta<typeof PageLayout>;

const Template: StoryFn<typeof PageLayout> = (args) => (
  <MemoryRouter>
    <PageLayout {...args}>
      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
        Page content goes here.
      </div>
    </PageLayout>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  overflow: true,
  pageHeading: <h1>Heading</h1>,
  topElement: <div style={{ marginBottom: "10px" }}>Top Bar</div>,
};

export const NoHeading = Template.bind({});
NoHeading.args = {
  overflow: true,
};

export const NoOverflow = Template.bind({});
NoOverflow.args = {
  overflow: false,
  pageHeading: <h1>No Overflow Example</h1>,
};
