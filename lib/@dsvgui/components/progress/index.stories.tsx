import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./index";
import { TimeIcon } from "../../icons";

const meta: Meta<typeof Progress> = {
  title: "Progress",
  component: Progress,
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Base: Story = {
  args: {
    title: "Progress",
    percent: 55,
    metrics: [
      {
        text: "%51 completed",
        icon: <TimeIcon />,
      },
      {
        text: "7/19 issues solved",
        icon: <TimeIcon />,
      },
      {
        text: "Due by April 17, 2023",
        icon: <TimeIcon />,
      },
      {
        text: "8/10 PRs closed",
        icon: <TimeIcon />,
      },
    ],
  },
};
