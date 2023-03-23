import { object, string, number } from "yup";

export const listArticles = object({
  username: string().required(),
  count: number().required().default(3),
}).noUnknown(true);
