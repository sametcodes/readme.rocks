import { object, string } from "yup";

export const getUser = object({
  username: string().required().meta({
    label: "Username",
    placeholder: "Username",
    description: "Please do not include the @ symbol.",
  }),
}).noUnknown(true);
