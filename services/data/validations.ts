import { AnyObject } from "yup";

export * from "@/services/data/platform/validations";
export * from "@/services/data/platformQuery/validations";
export * from "@/services/data/platformQueryConfig/validations";
export * from "@/services/data/user/validations";

import * as queryValidations from "@/services/platform/validations";
import * as viewValidations from "@/components/view/validations";

import { object } from "yup";

export const shapeDataAPISchema = (schema: AnyObject, query: string) => {
  // @ts-ignore
  const queryValidation = queryValidations[query];
  // @ts-ignore
  const viewValidation = viewValidations[query];

  const defaultSchema = object().required().noUnknown(true);
  return schema
    .shape({ queryConfig: queryValidation || defaultSchema })
    .shape({ viewConfig: viewValidation || defaultSchema });
};
