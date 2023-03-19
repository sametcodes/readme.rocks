import { object, number } from "yup";

export const getContributionsSummary = object().required().noUnknown(true);

export const getLanguageUsageSummary = object({
  first_n: number().required().min(1).max(8),
})
  .required()
  .noUnknown(true);

export const getRepositoryMilestone = object().required().noUnknown(true);
