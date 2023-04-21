import { NextApiRequest, NextApiResponse } from "next";
import { isObjectID } from "@/utils/index";
import { parseQueryString } from "@/utils";
import prisma from "@/services/prisma";
import { sendFallbackResponse } from "@/services/api/response";

import { ValidationError } from "yup";
import { shapeDataAPISchema } from "@/services/data/validations";

export const validatePublicRequest = async (
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

  const query = await prisma.platformQuery.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      cache_time: true,
      platformId: true,
      platform: { select: { name: true, code: true } },
    },
  });

  if (!query)
    return sendFallbackResponse(res, {
      title: "Not found",
      message: "The configuration does not exist, please check the URL.",
    });

  const querystring = Object.keys(req.query)
    .filter((key) => key !== "id")
    .map((key) => `${key}=${req.query[key]}`)
    .join("&");

  const config = parseQueryString(querystring);

  // @ts-ignore
  res.locals = {};
  res.locals.config = config;
  res.locals.query = query;
  res.locals.platform = query.platform;
  return next();
};

export const validatePublicBody = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { query, platform } = res.locals;

  const querystring = Object.keys(req.query)
    .filter((key) => key !== "id")
    .map((key) => `${key}=${req.query[key]}`)
    .join("&");
  const config = parseQueryString(querystring);

  const schema = shapeDataAPISchema(platform.code, query.name);
  try {
    await schema.validate({
      queryConfig: config?.queryConfig || {},
      viewConfig: config?.viewConfig || {},
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return sendFallbackResponse(res, {
        title: "Validation error",
        message: error.message,
      });
    }
  }

  return next();
};
