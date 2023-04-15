import type { Meta, StoryObj } from "@storybook/react";
import { BarStats } from "./index";

const meta: Meta<typeof BarStats> = {
  title: "BarStats",
  component: BarStats,
};
export default meta;

type Story = StoryObj<typeof BarStats>;

export const Base: Story = {
  args: {
    title: "BarStats",
    subtitle: "Last 30 Days",
    value: [
      {
        key: "str",
        name: "readme",
        percent: 30,
      },
      {
        key: "str",
        name: "rocks",
        percent: 25,
      },
      {
        key: "str",
        name: "bucketlist",
        percent: 3,
      },
    ],
    items_per_row: 2,
  },
};
