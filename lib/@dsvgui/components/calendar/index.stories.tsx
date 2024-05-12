import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "../../utils/grid";
import { Calendar, calendarDocumentPreferences, ICalendar } from "./index";

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

type Story = StoryObj<ICalendar>;

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

export const Base: Story = {
  args: {
    document: {
      w: 4,
      h: 2,
      ...calendarDocumentPreferences,
    },
    title: "Calendar",
    subtitle: "This is a Calendar component",
    dates,
    weekCount: 26,
  },
};

export const Compact: Story = {
  args: {
    document: {
      w: 4,
      h: 1,
      ...calendarDocumentPreferences,
    },
    dates,
    weekCount: 26,
  },
};

export const WithStreak: Story = {
  args: {
    document: {
      w: 4,
      h: 2,
      ...calendarDocumentPreferences,
    },
    title: "Calendar",
    subtitle: "This is a Calendar component",
    dates,
    weekCount: 26,
    showStreak: true,
  },
};

export const WithGrid = () => {
  return <Grid component={Calendar} stories={[Base, Compact, WithStreak]} />;
};
