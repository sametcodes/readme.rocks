import { object, string, number, boolean } from "yup";

export const getUser = object().noUnknown(true);
export const getUserSubmissions = object({
  title: string().meta({
    label: "Title",
    placeholder: "Title",
  }),
  subtitle: string().meta({
    label: "Subtitle",
    placeholder: "Subtitle",
  }),
  weekCount: number().min(8).max(52).default(26).meta({
    label: "Week Count",
    placeholder: "Week Count",
    description: "The number of weeks to show",
  }),
  boxColor: string().default("#40c463").meta({
    label: "Box Color",
    placeholder: "Box Color",
    description: "The color of the dates",
  }),
  showMonthLabels: boolean().meta({
    label: "Show month labels",
    placeholder: "Show month labels",
    description: "Show the months labels",
  }),
  showStreak: boolean().meta({
    label: "Show streak",
    placeholder: "Show streak",
    description: "Show the latest streak",
  }),
}).noUnknown(true);
