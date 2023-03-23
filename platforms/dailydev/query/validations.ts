import { object, string, number } from "yup";

export const listArticles = object({
  username: string().required(),
  count: number().required().min(1).max(5).default(3),
}).noUnknown(true);
