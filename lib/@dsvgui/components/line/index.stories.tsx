import type { Meta, StoryObj } from "@storybook/react";
import { Line } from "./index";

const meta: Meta<typeof Line> = {
  title: "Line",
  component: Line,
  argTypes: {
    leftTitle: { control: "text" },
    leftSubtitle: { control: "text" },
    rightTitle: { control: "text" },
    rightSubtitle: { control: "text" },
    period: { control: "radio", options: ["month", "weekday", "day", null] },
    points: { control: "array" },
    lineColor: { control: "color" },
  },
};
export default meta;

type Story = StoryObj<typeof Line>;

const randomPoints = (length: number) => {
  const points = [];
  for (let i = 0; i < length; i++) {
    points.push(Math.round(Math.random() * 50));
  }
  return points;
};

export const Base: Story = {
  args: {
    leftTitle: "Line",
    leftSubtitle: "Last 30 Days",
    rightTitle: "124 hrs 48 mins",
    rightSubtitle: "since last week",
    period: "month",
    points: randomPoints(3),
    lineColor: "#000000",
  },
};
