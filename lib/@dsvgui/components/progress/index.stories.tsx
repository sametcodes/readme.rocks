import type { Meta, StoryObj } from "@storybook/react";
import { progressDocumentPreferences, IProgress, Progress } from "./index";

import { AiOutlineCalendar } from "react-icons/ai";
import { HiChartBar } from "react-icons/hi";
import { VscIssues, VscGitPullRequest } from "react-icons/vsc";
import { Grid } from "../../utils/grid";

const meta: Meta<typeof Progress> = {
  title: "Progress",
  component: Progress,
};
export default meta;

type Story = StoryObj<IProgress>;

export const Base: Story = {
  args: {
    document: {
      w: 4,
      h: 2,
      ...progressDocumentPreferences,
    },
    title: "Progress",
    percent: 55,
    metrics: [
      { icon: HiChartBar, text: "%51 completed" },
      { icon: AiOutlineCalendar, text: "Due by April 17, 2023" },
      { icon: VscIssues, text: "7/19 issues solved" },
      { icon: VscGitPullRequest, text: "8/10 PRs closed" },
    ],
  },
};

export const OnlyFirstLine: Story = {
  args: {
    document: {
      w: 3,
      h: 2,
      ...progressDocumentPreferences,
    },
    title: "Progress",
    percent: 55,
    metrics: [
      { icon: HiChartBar, text: "%51 completed" },
      { icon: AiOutlineCalendar, text: "Due by April 17, 2023" },
      { icon: VscIssues, text: "7/19 issues solved" },
      { icon: VscGitPullRequest, text: "8/10 PRs closed" },
    ],
  },
};

export const OnlyProgress: Story = {
  args: {
    document: {
      w: 4,
      h: 1,
      ...progressDocumentPreferences,
    },
    title: "Progress",
    percent: 55,
    metrics: [
      { icon: HiChartBar, text: "%51 completed" },
      { icon: AiOutlineCalendar, text: "Due by April 17, 2023" },
      { icon: VscIssues, text: "7/19 issues solved" },
      { icon: VscGitPullRequest, text: "8/10 PRs closed" },
    ],
  },
};

export const WithGrid = () => {
  return (
    <Grid component={Progress} stories={[Base, OnlyFirstLine, OnlyProgress]} />
  );
};
