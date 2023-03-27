import { NextApiRequest, NextApiResponse } from "next";
import { isObjectID } from "@/utils/index";
import { parseQueryString } from "@/utils";
import prisma from "@/services/prisma";
import { sendFallbackResponse } from "@/services/api/response";

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

  // get GET query as string
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
