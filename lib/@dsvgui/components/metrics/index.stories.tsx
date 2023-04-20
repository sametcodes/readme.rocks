import type { Meta, StoryObj } from "@storybook/react";
// import { text } from "stream/consumers";
import { Metrics } from "./index";

import { SiCodewars } from "react-icons/si";

const meta: Meta<typeof Metrics> = {
  title: "Metrics",
  component: Metrics,
};
export default meta;

type Story = StoryObj<typeof Metrics>;

export const Base: Story = {
  args: {
    icon: SiCodewars,
    data: [
      { title: "Honor", value: 4 },
      { title: "Rank", value: 24 },
    ],
  },
};
