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
    title: "Latest efforts",
    subtitle: "Last 30 Days",
    items: [
      {
        key: "readme",
        name: "readme",
        value: 1,
      },
      {
        key: "bucketlist",
        name: "bucketlist",
        value: 90,
      },
    ],
    items_per_row: 2,
  },
};
