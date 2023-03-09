import { PlatformQueryConfig } from "@prisma/client";

export type ViewComponent = {
  (result: any, config: PlatformQueryConfig): JSX.Element;
};
