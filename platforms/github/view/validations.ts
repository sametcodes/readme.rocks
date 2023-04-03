import { object } from "yup";

export const getContributionsSummary = object().required().noUnknown(true);

export const getRepositoryMilestone = object().required().noUnknown(true);

export const getUserActiveSponsorGoal = object().required().noUnknown(true);
