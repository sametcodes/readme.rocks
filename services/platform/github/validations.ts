import { string, object } from "yup";

export const getLanguageUsageSummary = object({
  field: string()
    .required()
    .default("PUSHED_AT")
    .oneOf(["PUSHED_AT", "CREATED_AT", "UPDATED_AT", "STARGAZERS"]),
  direction: string().required().default("ASC").oneOf(["ASC", "DESC"]),
}).noUnknown(true);
