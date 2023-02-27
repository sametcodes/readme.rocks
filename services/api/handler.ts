import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getPlatformResponse } from "@services/platform/response";
import { getUserConfigs } from "@services/data/config";
import { NextResponse } from "next/server";

type PlatformAPIHandler = {
  (services: any, templates: any): NextApiHandler;
};

const handlePlatformAPI: PlatformAPIHandler = (services, templates) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const uid = req.query.uid as string;
    if (!uid)
      return res
        .status(400)
        .json({ message: "Bad request: uid parameter is missing" });

    const userConfigs = await getUserConfigs({
      session: { user: { id: uid } },
    });
    if (!userConfigs)
      return res.status(404).json({ message: "No user config" });

    const result = await getPlatformResponse(
      req.query,
      services,
      templates,
      userConfigs
    );
    if (result.success === false)
      return res.status(result.status).json({ message: result.error });

    res.setHeader("Content-Type", result.contentType || "image/svg+xml");
    return res.status(result.status).send(result.data);
  };
};

export default handlePlatformAPI;
