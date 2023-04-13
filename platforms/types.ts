import { PlatformQueryConfig, Connection } from "@prisma/client";

export type ViewComponent = (
  result: any,
  config: PlatformQueryConfig
) => JSX.Element | Promise<JSX.Element> | null;

export type ServiceResponse = any | Error;

export type QueryService = (
  connection: Connection,
  config: PlatformQueryConfig,
  secured: boolean
) => Promise<ServiceResponse>;
