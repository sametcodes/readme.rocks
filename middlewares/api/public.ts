import { NextApiRequest, NextApiResponse } from "next";
import { isObjectID } from "@/utils/index";
import { parseQueryString } from "@/utils";

export const validatePublicRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const id = req.query.id as string;
  if (isObjectID(id) === false)
    return res
      .status(400)
      .json({ message: "Config parameter is missing or invalid" });

  const query = await prisma.platformQuery.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      platformId: true,
      platform: { select: { name: true, code: true } },
    },
  });

  if (!query) return res.status(404).json({ message: "Query not found" });

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
