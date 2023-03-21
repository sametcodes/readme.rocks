import { NextApiRequest, NextApiResponse } from "next";

import { getPlatformServices, getPlatformTemplates } from "@/platforms";

export const resolveHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { platform } = res.locals;

  const services = getPlatformServices(platform.code);
  const templates = getPlatformTemplates(platform.code);

  res.locals.services = services;
  res.locals.templates = templates;

  next();
};
