import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getPlatformResponse } from "@services/platform/response";
import prisma from "@services/prisma";

type PlatformAPIHandler = {
  (platformCode: string, services: any, templates: any): NextApiHandler;
};

const handlePlatformAPI: PlatformAPIHandler = (
  platformCode,
  services,
  templates
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const uid = req.query.uid as string;
    if (!uid)
      return res
        .status(400)
        .json({ message: "Bad request: uid parameter is missing" });

    const platform = await prisma.platform.findFirst({
      where: { code: platformCode },
    });
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });

    const userConfig = await prisma.config.findFirst({
      select: { value: true, platform: { select: { name: true } } },
      where: { userId: uid, platformId: platform.id },
    });
    const connection = await prisma.connection.findFirst({
      where: { userId: uid, platformId: platform.id },
    });
    if (!connection)
      return res.status(404).json({ message: "No user config or connection" });

    const result = await getPlatformResponse(
      req.query,
      services,
      templates,
      userConfig?.value,
      connection
    );
    if (result.success === false)
      return res.status(result.status).json({ message: result.error });

    res.setHeader("Content-Type", result.contentType || "image/svg+xml");
    return res.status(result.status).send(result.data);
  };
};

export default handlePlatformAPI;
