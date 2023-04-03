import { NextApiRequest, NextApiResponse } from "next";

import * as platforms from "@/platforms";

export const resolveHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  // @ts-ignore
  const { platform } = res.locals;

  const services =
    platforms.services[platform.code as keyof typeof platforms.services];
  const templates =
    platforms.templates[platform.code as keyof typeof platforms.templates];
  // @ts-ignore
  res.locals.services = services;
  // @ts-ignore
  res.locals.templates = templates;

  next();
};
