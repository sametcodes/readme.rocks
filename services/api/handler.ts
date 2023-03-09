import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getPlatformResponse } from "@/services/platform/response";
import prisma from "@/services/prisma";
import { isObjectID } from "@/utils";

import { availableOAuthProviders } from "@/services/oauth/providers";
import actions from "@/services/oauth/actions";
import { Connection, PlatformQueryConfig } from "@prisma/client";

type PlatformAPIHandler = (
  platformCode: string,
  services: any,
  templates: any
) => NextApiHandler;

export const validateRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const id = req.query.id as string;
  if (isObjectID(id) === false)
    return res
      .status(400)
      .json({ message: "Config parameter is missing or invalid" });

  const config = await prisma.platformQueryConfig.findFirst({
    where: { id },
    select: {
      id: true,
      userId: true,
      queryConfig: true,
      viewConfig: true,
      platformQueryId: true,
      platformId: true,
      platformQuery: { select: { name: true } },
      platform: { select: { name: true, code: true } },
    },
  });

  if (!config) return res.status(404).json({ message: "Config not found" });

  // @ts-ignore
  res.locals = {};
  res.locals.platformQueryConfig = config;
  return next();
};

export const validateAccessToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const {
    platformQueryConfig: { userId, platformId, platform },
  } = res.locals;

  if (!availableOAuthProviders.includes(platform.code)) return next();
  const connection = await prisma.connection.findFirst({
    where: { userId, platformId },
  });
  if (!connection)
    return res
      .status(404)
      .json({ message: "User has no connection on this platform" });
  res.locals.connection = connection;

  if (connection.expires_at && Date.now() > connection.expires_at) {
    try {
      await actions.refreshAccessToken(platform.code, connection);
      res.locals.connection = (await prisma.connection.findFirst({
        where: { id: connection.id },
      })) as Connection;
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });
    }
  }

  return next();
};

const handlePlatformAPI: PlatformAPIHandler = (
  platformCode,
  services,
  templates
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const { platformQueryConfig: config, connection } = res.locals;

    const result = await getPlatformResponse(
      req.query,
      services,
      templates,
      connection,
      config
    );

    if (result.success === false) {
      return res.status(result.status).json({ message: result.error });
    }

    res.setHeader("Content-Type", result.contentType || "image/svg+xml");
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59");
    return res.status(result.status).send(result.data);
  };
};

export default handlePlatformAPI;
