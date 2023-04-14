import { string, object } from "yup";

export const getUser = object({
  username: string().required().meta({
    label: "Username",
    placeholder: "Username",
    description: "The username of the profile, do not include the @ symbol.",
  }),
})
  .required()
  .noUnknown(true);
