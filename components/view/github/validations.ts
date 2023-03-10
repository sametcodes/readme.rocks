import { object, number, bool } from "yup";

export const getCurrentYearContributions = object().required().noUnknown(true);

export const getPopularContributions = object().required().noUnknown(true);

export const getContributionsSummary = object().required().noUnknown(true);

export const getLanguageUsageSummary = object({
  first_n: number().required().min(1).max(8),
})
  .required()
  .noUnknown(true);
