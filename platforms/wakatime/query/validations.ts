import { object, string } from "yup";

export const getAllTimeSinceToday = object().required().noUnknown(true);

export const getTimeWithRange = object({
  range: string()
    .required()
    .oneOf([
      "Last 7 Days",
      "Last 7 Days from Yesterday",
      "Last 14 Days",
      "Last 30 Days",
      "This Week",
      "Last Week",
      "This Month",
      "Last Month",
    ])
    .meta({
      label: "Time range",
      placeholder: "Range",
      description: "The range of time to get data for",
    }),
})
  .required()
  .noUnknown(true);

export const getMostUsedLanguages = object({
  range: string()
    .required()
    .oneOf([
      "last_7_days",
      "last_30_days",
      "last_6_months",
      "last_year",
      "all_time",
    ])
    .meta({
      label: "Time range",
      placeholder: "Range",
      description: "The range of time to get data for",
    }),
})
  .required()
  .noUnknown(true);
