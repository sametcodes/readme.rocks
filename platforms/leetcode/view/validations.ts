import { object, string } from "yup";

export const getUser = object().noUnknown(true);
export const getUserSubmissions = object({
  title: string().meta({
    label: "Title",
    placeholder: "Title",
  }),
  subtitle: string().meta({
    label: "Subtitle",
    placeholder: "Subtitle",
  }),
}).noUnknown(true);
