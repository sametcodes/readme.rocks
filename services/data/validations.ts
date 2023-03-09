export * from "@/services/data/platform/validations";
export * from "@/services/data/platformQuery/validations";
export * from "@/services/data/platformQueryConfig/validations";
export * from "@/services/data/user/validations";

import * as queryValidations from "@/services/platform/validations";
import * as viewValidations from "@/components/view/validations";
import { AnyObject } from "yup";

export const shapeDataAPISchema = (schema: AnyObject, query: string) => {
  // @ts-ignore
  const queryValidation = queryValidations[query];
  // @ts-ignore
  const viewValidation = viewValidations[query];
  return schema.shape(queryValidation).shape(viewValidation);
};
