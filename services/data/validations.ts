import { AnyObject } from "yup";

export * from "@/services/data/platform/validations";
export * from "@/services/data/platformQuery/validations";
export * from "@/services/data/platformQueryConfig/validations";
export * from "@/services/data/user/validations";

import { object } from "yup";
import { getPlatformValidations } from "../../platforms/index";

export const shapeDataAPISchema = (
  platformCode: string,
  queryName: string,
  schema?: AnyObject
) => {
  const validation = getPlatformValidations(platformCode);

  if (!validation) throw new Error("No validation found to shape");

  const [queryValidation, viewValidation] = [
    validation.query[queryName],
    validation.view[queryName],
  ];

  const defaultSchema = object({}).required().noUnknown(true);
  return (schema || defaultSchema).shape({
    viewConfig: viewValidation || defaultSchema,
    queryConfig: queryValidation || defaultSchema,
  });
};
