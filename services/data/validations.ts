import { AnyObject } from "yup";

export * from "@/services/data/platform/validations";
export * from "@/services/data/platformQuery/validations";
export * from "@/services/data/platformQueryConfig/validations";
export * from "@/services/data/user/validations";

import { object } from "yup";
import { validations } from "../../platforms/index";
import { PlatformCode } from "@prisma/client";

export const shapeDataAPISchema = (
  platformCode: PlatformCode,
  queryName: string,
  schema?: AnyObject
) => {
  const validation = validations[platformCode];

  if (!validation) throw new Error("No validation found to shape");

  const [queryValidation, viewValidation] = [
    validation.query[queryName as keyof typeof validation.query],
    validation.view[queryName as keyof typeof validation.view],
  ];

  const defaultSchema = object({}).required().noUnknown(true);
  return (schema || defaultSchema).shape({
    viewConfig: viewValidation || defaultSchema,
    queryConfig: queryValidation || defaultSchema,
  });
};
