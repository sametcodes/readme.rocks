import { object } from "yup";

export const getAllTimeSinceToday = object().required().noUnknown(true);

export const getTimeWithRange = object().required().noUnknown(true);
