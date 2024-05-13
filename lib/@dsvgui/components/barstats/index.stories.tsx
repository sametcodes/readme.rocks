import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "../../utils/grid";
import { BarStats, barstatsDocumentPreferences, IBarStats } from "./index";

const meta: Meta<typeof BarStats> = {
  title: "BarStats",
  component: BarStats,
  args: {
    title: "Latest efforts",
    subtitle: "Last 30 Days",
    document: {
      w: 4,
      h: 2,
      ...barstatsDocumentPreferences,
    },
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
export default meta;

type Story = StoryObj<IBarStats>;

export const Base: Story = {
  args: {
    document: {
      w: 4,
      h: 2,
      ...barstatsDocumentPreferences,
    },
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
      {
        key: "project1",
        name: "project1",
        value: 90,
      },
      {
        key: "project2",
        name: "project2",
        value: 90,
      },
    ],
    items_per_row: 2,
  },
};

export const Compact: Story = {
  args: {
    document: {
      w: 4,
      h: 2,
      ...barstatsDocumentPreferences,
    },
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
      {
        key: "project1",
        name: "project1",
        value: 90,
      },
      {
        key: "project2",
        name: "project2",
        value: 90,
      },
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

export const WithGrid = () => {
  return <Grid component={BarStats} stories={[Base, Compact]} />;
};
