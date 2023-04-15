import type { Meta, StoryObj } from "@storybook/react";
// import { text } from "stream/consumers";
import { Metrics } from "./index";
import { CodewarsIcon } from "../../icons";

const meta: Meta<typeof Metrics> = {
  title: "Metrics",
  component: Metrics,
};
export default meta;

type Story = StoryObj<typeof Metrics>;

export const Base: Story = {
  args: {
    icon: CodewarsIcon,
    data: [
      { title: "Honor", value: 4 },
      { title: "Rank", value: 24 },
    ],
  },
};
