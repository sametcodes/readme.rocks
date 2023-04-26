import { object, number, string, boolean } from "yup";

export const getAllTimeSinceToday = object().required().noUnknown(true);

export const getTimeWithRange = object({
  lineColor: string().required().default("#000000").meta({
    label: "Line Color",
    placeholder: "Line Color",
    description: "The color of the line.",
  }),
  showPeriod: boolean().required().default(false).meta({
    label: "Show Period",
    placeholder: "Show Period",
    description: "Whether to show the period or not.",
  }),
})
  .required()
  .noUnknown(true);

export const getMostUsedLanguages = object({
  language_count: number().min(1).max(10).default(6).required().meta({
    label: "Language Count",
    placeholder: "Language Count",
    description: "The number of languages to display. Default is 6.",
  }),
})
  .required()
  .noUnknown(true);

export const getMostRecentProjects = object({
  projects: string().required().default("all").meta({
    label: "Projects",
    placeholder: "project1, project2, project3",
    description:
      "The names of the projects you want to list, separated by commas. The rest of will be ignored. If you want to list all projects, leave it as 'all'.",
  }),
})
  .required()
  .noUnknown(true);
