import type { Meta, StoryObj } from "@storybook/react";
import { metricsDocumentPreferences, IMetrics, Metrics } from "./index";

import { SiCodewars, SiGithub, SiWakatime } from "react-icons/si";
import { Grid } from "../grid";
import { getGridComponents } from "../../utils";

const meta: Meta<typeof Metrics> = {
  title: "Metrics",
  component: Metrics,
};
export default meta;

type Story = StoryObj<IMetrics>;

export const Base: Story = {
  args: {
    document: {
      w: 3,
      h: 1,
      ...metricsDocumentPreferences,
    },
    icon: SiCodewars,
    data: [
      { title: "Honor", value: "347" },
      { title: "Rank", value: "5 kyu" },
    ],
  },
};

export const Multiple: Story = {
  args: {
    document: {
      w: 4,
      h: 1,
      ...metricsDocumentPreferences,
    },
    icon: SiGithub,
    data: [
      { title: "Commits", value: 846 },
      { title: "PRs", value: 143 },
      { title: "Issues", value: 92 },
    ],
  },
};

export const Long: Story = {
  args: {
    document: {
      w: 4,
      h: 1,
      ...metricsDocumentPreferences,
    },
    icon: SiWakatime,
    data: [{ title: "All time since today", value: "997 hrs 49 mins" }],
  },
};

const rocks = getGridComponents([Base, Multiple, Long], Metrics);
export const WithGrid = () => {
  return <Grid rocks={rocks} />;
};
