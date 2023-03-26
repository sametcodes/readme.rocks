import { object, string } from "yup";

export const getReputation = object({
  sort: string()
    .default("reputation")
    .required()
    .oneOf(["reputation", "creation", "name"])
    .meta({
      label: "Sort By",
      placeholder: "Sort By",
      description: "Sort by reputation, creation, or name.",
    }),
  order: string().default("desc").required().oneOf(["desc", "asc"]).meta({
    label: "Sort Direction",
    placeholder: "Sort Direction",
    description: "Sort in descending or ascending order.",
  }),
}).noUnknown(true);
