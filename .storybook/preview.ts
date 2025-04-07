import type { Preview } from "@storybook/react";
import { NightBackgroundPrimary } from "../src/styles/colors";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: NightBackgroundPrimary }, // adjust to your app's background color
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
