import type { Meta, StoryObj } from "@storybook/react";
import { Line } from "./index";

const meta: Meta<typeof Line> = {
  title: "Line",
  component: Line,
  argTypes: {
    items: {
      control: {
        type: "object",
      },
    },
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
    items: [
      {
        leftTitle: "Line",
        leftSubtitle: "Last 30 Days",
        points: randomPoints(10),
      },
    ],
  },
};

export const ColoredLines: Story = {
  args: {
    items: [
      {
        leftTitle: "Line",
        leftSubtitle: "Last 30 Days",
        points: randomPoints(10),
        lineColor: "#f0000f",
      },
    ],
  },
};

export const SecondaryTitle: Story = {
  args: {
    items: [
      {
        leftTitle: "Line",
        leftSubtitle: "Last 30 Days",
        rightTitle: "124 hrs 48 mins",
        rightSubtitle: "since last week",
        points: randomPoints(10),
        lineColor: "#000000",
      },
    ],
  },
};

export const PeriodLabels: Story = {
  args: {
    items: [
      {
        leftTitle: "Line",
        leftSubtitle: "Last 30 Days",
        points: randomPoints(10),
        lineColor: "#000000",
        period: "month",
      },
    ],
  },
};

export const MultipleLines: Story = {
  args: {
    items: [
      {
        leftTitle: "Line",
        leftSubtitle: "Last 30 Days",
        rightTitle: "124 hrs",
        rightSubtitle: "since last week",
        points: randomPoints(10),
        lineColor: "#0000ff",
        period: "day",
      },
      {
        leftTitle: "Line 2",
        leftSubtitle: "Last 90 Days",
        rightTitle: "+$1.2k",
        rightSubtitle: "since last week",
        points: randomPoints(5),
        lineColor: "#55f155",
        period: "weekday",
      },
      {
        leftTitle: "Line 3",
        leftSubtitle: "Last 30 Days",
        rightTitle: "-$123",
        rightSubtitle: "since last week",
        points: randomPoints(15),
        lineColor: "#ff3333",
        period: "month",
      },
    ],
  },
};
