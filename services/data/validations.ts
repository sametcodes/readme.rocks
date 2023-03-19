import { AnyObject } from "yup";

export * from "@/services/data/platform/validations";
export * from "@/services/data/platformQuery/validations";
export * from "@/services/data/platformQueryConfig/validations";
export * from "@/services/data/user/validations";

import * as queryValidations from "@/services/platform/validations";
import * as viewValidations from "@/views/queries/validations";

import { object } from "yup";

export const shapeDataAPISchema = (query: string, schema?: AnyObject) => {
  // @ts-ignore
  const queryValidation = queryValidations[query];
  // @ts-ignore
  const viewValidation = viewValidations[query];

  const defaultSchema = object({}).required().noUnknown(true);
  return (schema || defaultSchema).shape({
    viewConfig: viewValidation || defaultSchema,
    queryConfig: queryValidation || defaultSchema,
  });
};
