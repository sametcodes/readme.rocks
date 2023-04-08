import { object, number } from "yup";

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
