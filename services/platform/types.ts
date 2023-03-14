import { Connection, PlatformQueryConfig } from "@prisma/client";

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
