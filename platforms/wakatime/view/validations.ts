import { object, number, string } from "yup";

export const getAllTimeSinceToday = object().required().noUnknown(true);

export const getTimeWithRange = object().required().noUnknown(true);

export const getMostUsedLanguages = object({
  language_count: number().min(1).max(10).required().meta({
    label: "Language Count",
    placeholder: "Language Count",
    description: "The number of languages to display.",
  }),
})
  .required()
  .noUnknown(true);

export const getMostRecentProjects = object({
  projects: string().required().meta({
    label: "Projects",
    placeholder: "project1, project2, project3",
    description:
      "The names of the projects you want to list, separated by commas. The rest of will be ignored. If you want to list all projects, leave it as 'all'.",
  }),
})
  .required()
  .noUnknown(true);
