import { NextApiRequest, NextApiResponse } from "next";
import { isObjectID } from "@/utils/index";
import prisma from "@/services/prisma";
import { sendFallbackResponse } from "@/services/api/response";

import { ValidationError } from "yup";
import { shapeDataAPISchema } from "@/services/data/validations";
import kv from "@vercel/kv";
import { PlatformQueryConfig } from "@prisma/client";

type CachedPrivateQuery =
  | (PlatformQueryConfig & {
      platformQuery: { name: string; cache_time: number };
      platform: { name: string; code: string };
    })
  | null;

export const validatePrivateRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const id = req.query.id as string;
  if (isObjectID(id) === false)
    return sendFallbackResponse(res, {
      title: "Invalid configuration",
      message: "The configuration ID doesn't seem valid.",
    });

  let queryConfig: CachedPrivateQuery;
  const cachedConfig: CachedPrivateQuery = await kv.get(id);
  if (cachedConfig) {
    queryConfig = cachedConfig;
  } else {
    queryConfig = await prisma.platformQueryConfig.findFirst({
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
    await kv.set(id, JSON.stringify(queryConfig));
  }

  if (!queryConfig)
    return sendFallbackResponse(res, {
      title: "Not found",
      message: "The configuration does not exist, please check the URL.",
    });

  // @ts-ignore
  res.locals = {};
  res.locals.config = queryConfig;
  res.locals.platform = queryConfig.platform;
  res.locals.query = queryConfig.platformQuery;
  return next();
};

export const validatePrivateBody = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { query, platform, config } = res.locals;

  const schema = shapeDataAPISchema(platform.code, query.name);

  try {
    await schema.validate({
      queryConfig: config.queryConfig,
      viewConfig: config.viewConfig,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      sendFallbackResponse(res, {
        title: "Validation error",
        message: error.message,
      });
    }
  }

  return next();
};
