import { object, string } from "yup";

export const getUser = object({
  username: string().required(),
}).noUnknown(true);
