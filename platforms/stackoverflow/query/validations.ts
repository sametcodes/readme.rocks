import { object, string } from "yup";

export const getReputation = object({
  sort: string()
    .default("reputation")
    .required()
    .oneOf(["reputation", "creation", "name"]),
  order: string().default("desc").required().oneOf(["desc", "asc"]),
}).noUnknown(true);
