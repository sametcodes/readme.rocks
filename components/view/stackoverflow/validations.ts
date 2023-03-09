import { object } from "yup";

export const getReputation = object().required().noUnknown(true);
