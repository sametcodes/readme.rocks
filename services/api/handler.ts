import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Connection } from "@prisma/client";
import JSXRender from "@/utils/render";
import { trimChars } from "@/utils";

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

    const templateOutput = await template(response.data, config);
    if (!templateOutput)
      return res.status(500).json({ message: "Template output is empty" });

    const data = trimChars(JSXRender(templateOutput));
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400"
    );
    return res.status(200).send(data);
  };
};

export default handlePlatformAPI;
