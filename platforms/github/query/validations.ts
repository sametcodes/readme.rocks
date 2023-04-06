import { string, number, object, boolean } from "yup";

export const getRepositoryMilestone = object({
  repository_name: string().required().meta({
    label: "Repository Name",
    placeholder: "Repository Name",
    description: "The name of the repository.",
  }),
  milestone_id: number().required().min(1).meta({
    label: "Milestone ID",
    placeholder: "Milestone ID",
    description:
      "The ID of the milestone. Please check if it's valid on the repository. ",
  }),
})
  .required()
  .noUnknown(true);

export const getPublicRepositoryMilestone = object({
  owner_name: string().required().meta({
    label: "Owner",
    placeholder: "owner",
    description: "The name of the owner of the repository.",
  }),
  is_organization: boolean()
    .required()
    .meta({ label: "Is an organization?", placeholder: "Is organization?" }),
  repository_name: string().required().meta({
    label: "Repository Name",
    placeholder: "repository",
    description: "The name of the repository.",
  }),
  milestone_id: number().required().min(1).meta({
    label: "Milestone ID",
    placeholder: "40",
    description:
      "The ID of the milestone. Please check if it's valid on the repository. ",
  }),
})
  .required()
  .noUnknown(true);

export const getUserActiveSponsorGoal = object({
  username: string().required().meta({
    label: "Username",
    placeholder: "Username",
    description: "The username of the profile, do not include the @ symbol.",
  }),
})
  .required()
  .noUnknown(true);

export const getUserCommitStreak = object().required().noUnknown(true);
