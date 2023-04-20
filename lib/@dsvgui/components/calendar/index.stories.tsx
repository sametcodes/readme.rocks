import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./index";

const meta: Meta<typeof Calendar> = {
  title: "Calendar",
  component: Calendar,
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    boxColor: { control: "color" },
    dates: { control: "object" },
    weekCount: {
      control: "number",
      defaultValue: 52,
      min: 1,
      max: 52,
      step: 1,
    },
    showMonthLabels: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Calendar>;

const produceFakeDates = () => {
  const today = Date.now();
  const fakeDates: { [key: string]: number } = {};
  for (let i = 0; i < 365; i++) {
    const date = new Date(today - i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().split("T")[0];
    fakeDates[dateString] = Math.floor(Math.random() * 100);
  }
  return fakeDates;
};

const dates = produceFakeDates();

export const Regular: Story = {
  args: {
    dates,
  },
};

export const WithText: Story = {
  args: {
    title: "Calendar",
    subtitle: "This is a Calendar component",
    dates,
    weekCount: 52,
  },
};

export const WithStreak: Story = {
  args: {
    title: "Calendar",
    subtitle: "This is a Calendar component",
    dates,
    weekCount: 26,
    showStreak: true,
  },
};
