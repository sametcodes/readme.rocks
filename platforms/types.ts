import { PlatformQueryConfig } from "@prisma/client";
import { Connection } from "@prisma/client";

export type ViewComponent = (
  result: any,
  config: PlatformQueryConfig
) => JSX.Element | Promise<JSX.Element>;

export type ServiceResponse = {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    code: number;
  };
};

export type QueryService = (
  connection: Connection,
  config: PlatformQueryConfig
) => Promise<ServiceResponse>;
