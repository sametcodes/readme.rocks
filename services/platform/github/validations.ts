import { string, object } from "yup";

export const getLanguageUsageSummary = {
  queryConfig: object({
    field: string()
      .required()
      .oneOf(["PUSHED_AT", "CREATED_AT", "UPDATED_AT", "STARGAZERS"]),
    direction: string().required().oneOf(["ASC", "DESC"]),
  }).noUnknown(true),
};
