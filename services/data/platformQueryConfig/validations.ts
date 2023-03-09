import { object } from "yup";

export const createPlatformQueryConfig = object({
  queryConfig: object().default(null).unknown(false),
  viewConfig: object().default(null).unknown(false),
}).noUnknown(true);

export const editPlatformQueryConfig = object({
  queryConfig: object().default(null).unknown(false),
  viewConfig: object().default(null).unknown(false),
}).noUnknown(true);
