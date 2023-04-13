import { object, string, number } from "yup";

export const getContributionsSummary = object().required().noUnknown(true);

export const getRepositoryMilestone = object().required().noUnknown(true);

export const getUserActiveSponsorGoal = object().required().noUnknown(true);

export const getUserCommitStreak = object().required().noUnknown(true);

export const getContributors = object({
  title: string().meta({
    label: "Title",
    placeholder: "Title",
    description: "Title of the widget",
  }),
  subtitle: string().meta({
    label: "Subtitle",
    placeholder: "Subtitle",
    description: "Subtitle of the widget",
  }),
  items_per_row: number().min(5).max(25).default(20).meta({
    label: "Items per row",
    placeholder: "Items per row",
    description: "Number of items per row. Default is 20.",
  }),
})
  .required()
  .noUnknown(true);

export const getUserSponsorList = object({
  title: string().meta({
    label: "Title",
    placeholder: "Title",
    description: "Title of the widget",
  }),
  subtitle: string().meta({
    label: "Subtitle",
    placeholder: "Subtitle",
    description: "Subtitle of the widget",
  }),
  items_per_row: number().min(5).max(25).default(20).meta({
    label: "Items per row",
    placeholder: "Items per row",
    description: "Number of items per row. Default is 20.",
  }),
})
  .required()
  .noUnknown(true);
