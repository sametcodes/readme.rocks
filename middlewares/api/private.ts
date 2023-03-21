import { NextApiRequest, NextApiResponse } from "next";
import { isObjectID } from "@/utils/index";

export const validatePrivateRequest = async (
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
  res.locals.config = config;
  res.locals.platform = config.platform;
  res.locals.query = config.platformQuery;
  return next();
};
