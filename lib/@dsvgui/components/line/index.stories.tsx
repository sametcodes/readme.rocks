import type { Meta, StoryObj } from "@storybook/react";
import { Line } from "./index";
import { TimeIcon } from "../../icons";

const meta: Meta<typeof Line> = {
  title: "Line",
  component: Line,
};
export default meta;

type Story = StoryObj<typeof Line>;

export const Base: Story = {
  args: {
    title: "Line",
    subtitle: "Last 30 Days",
    total: "124 hrs 48 mins",
    points: [32, 56, 9, 27, 22, 55, 2],
  },
};
