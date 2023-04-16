import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./index";

import { AiOutlineCalendar } from "react-icons/ai";
import { RxPieChart } from "react-icons/rx";
import { VscIssues, VscGitPullRequest } from "react-icons/vsc";

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
      { icon: RxPieChart, text: "%51 completed" },
      { icon: AiOutlineCalendar, text: "Due by April 17, 2023" },
      { icon: VscIssues, text: "7/19 issues solved" },
      { icon: VscGitPullRequest, text: "8/10 PRs closed" },
    ],
  },
};
