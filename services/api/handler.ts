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

    const user = await prisma.user.findFirst({ where: { id: uid } });
    if (!user) return res.status(404).json({ message: "User not found" });

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
      return res
        .status(404)
        .json({ message: "User has no connection on this platform" });

    const result = await getPlatformResponse(
      req.query,
      services,
      templates,
      connection,
      userConfig
    );
    if (result.success === false)
      return res.status(result.status).json({ message: result.error });

    res.setHeader("Content-Type", result.contentType || "image/svg+xml");
    return res.status(result.status).send(result.data);
  };
};

export default handlePlatformAPI;
