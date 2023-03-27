import { NextApiRequest, NextApiResponse } from "next";
import { isObjectID } from "@/utils/index";
import prisma from "@/services/prisma";
import { sendFallbackResponse } from "@/services/api/response";

export const validatePrivateRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const id = req.query.id as string;
  if (isObjectID(id) === false)
    return sendFallbackResponse(res, 400, {
      title: "Invalid configuration",
      message: "The configuration ID doesn't seem valid.",
    });

  const config = await prisma.platformQueryConfig.findFirst({
    where: { id },
    select: {
      id: true,
      userId: true,
      queryConfig: true,
      viewConfig: true,
      platformQueryId: true,
      platformId: true,
      platformQuery: { select: { name: true, cache_time: true } },
      platform: { select: { name: true, code: true } },
    },
  });

  if (!config)
    return sendFallbackResponse(res, 404, {
      title: "Not found",
      message: "The configuration does not exist, please check the URL.",
    });

  // @ts-ignore
  res.locals = {};
  res.locals.config = config;
  res.locals.platform = config.platform;
  res.locals.query = config.platformQuery;
  return next();
};
