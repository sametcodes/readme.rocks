import { object, number, bool } from "yup";

export const getLanguageUsageSummary = {
  viewConfig: object({
    first_n: number().required().min(1).max(8),
    show_legendary: bool().default(true).required(),
  })
    .required()
    .noUnknown(true),
};
