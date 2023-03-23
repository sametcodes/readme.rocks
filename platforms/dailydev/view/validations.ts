import { object } from "yup";

export const listArticles = object().required().noUnknown(true);
