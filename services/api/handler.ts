import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getPlatformResponse } from "@services/platform/response";
import { getUserConfigs } from "@services/data/config";

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
      select: {
        value: true,
        platform: { select: { name: true } },
      },
      where: { userId: uid, platformId: platform.id },
    });

    if (!userConfig) return res.status(404).json({ message: "No user config" });

    const result = await getPlatformResponse(
      req.query,
      services,
      templates,
      userConfig.value
    );
    if (result.success === false)
      return res.status(result.status).json({ message: result.error });

    res.setHeader("Content-Type", result.contentType || "image/svg+xml");
    return res.status(result.status).send(result.data);
  };
};

export default handlePlatformAPI;
