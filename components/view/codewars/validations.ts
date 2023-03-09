import { object } from "yup";

export const getUser = object().required().noUnknown(true);
