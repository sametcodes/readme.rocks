import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./index";
import { GridItem } from "../../document/type";

import articleRocks from "../article/export";
import barstatsRocks from "../barstats/export";
import calendarRocks from "../calendar/export";
import flockRocks from "../flock/export";
import lineRocks from "../line/export";
import metricsRocks from "../metrics/export";
import placeholderRocks from "../placeholder/export";
import progressRocks from "../progress/export";

const meta: Meta<typeof Grid> = {
  title: "Grid",
  component: Grid,
};
export default meta;

type Story = StoryObj<typeof Grid>;

const items: Array<GridItem<any>> = [
  ...articleRocks,
  ...barstatsRocks,
  ...calendarRocks,
  ...flockRocks,
  ...lineRocks,
  ...metricsRocks,
  ...placeholderRocks,
  ...progressRocks,
];

export const Base: Story = {
  args: {
    rocks: items,
  },
};
