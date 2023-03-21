import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getPlatformResponse } from "@/services/platform/response";

import prisma from "@/services/prisma";
import { Connection, PlatformQueryConfig } from "@prisma/client";

import JSXRender from "@/utils/render";
import { isObjectID, trimChars } from "@/utils";

type PlatformAPIHandler = (
  services: any,
  templates: any,
  queryName: string,
  config: any,
  connection?: Connection | null
) => NextApiHandler;

const handlePlatformAPI: PlatformAPIHandler = (
  services,
  templates,
  queryName,
  config,
  connection
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (Object.keys(services).includes(queryName) === false)
      return res.status(404).json({ message: "Query not found" });

    const service = services[queryName];
    const template = templates[queryName];

    if (!service) return res.status(500).json({ message: "Service not found" });
    if (!template)
      return res.status(500).json({ message: "Template not found" });

    const response = await service(connection, config);

    if (response.success === false)
      return res.status(500).json({ message: response.message });

    const templateOutput = template(response.data, config);
    if (!templateOutput)
      return res.status(500).json({ message: "Template output is empty" });

    const data = trimChars(JSXRender(templateOutput));
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59");
    return res.status(200).send(data);
  };
};

export default handlePlatformAPI;
