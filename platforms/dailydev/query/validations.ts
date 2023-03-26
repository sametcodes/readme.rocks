import { object, string, number } from "yup";

export const listArticles = object({
  username: string().required().meta({
    label: "Username",
    placeholder: "Username",
    description: "Please do not include the @ symbol.",
  }),
  count: number().required().min(1).max(5).default(3).meta({
    label: "Count",
    placeholder: "Count",
    description: "The number of articles to return. Minimum 1, maximum 5.",
  }),
}).noUnknown(true);
