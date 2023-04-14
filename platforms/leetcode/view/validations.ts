import { object } from "yup";

export const getUser = object().noUnknown(true);
