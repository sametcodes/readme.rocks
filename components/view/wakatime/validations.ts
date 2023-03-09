import { object } from "yup";

export const getAllTimeSinceToday = object().required().noUnknown(true);
