import JSXRender from "@/utils/render";
import { trimChars } from "@/utils";
import { Connection, PlatformQueryConfig } from "@prisma/client";

export const getPlatformResponse = async (
  services: any,
  templates: any,
  query: string,
  connection: Connection | null,
  config: PlatformQueryConfig & { platformQuery: { name: string } }
) => {};
