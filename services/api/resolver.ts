import { NextApiRequest, NextApiResponse } from "next";

import passport from "passport";
import refresh from "passport-oauth2-refresh";

import { getPlatformServices } from "@/services/platform";
import { getPlatformTemplates } from "@/views/queries";
import { getProvider } from "@/services/oauth/providers";

const resolveHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const {
    platformQueryConfig: { platform },
  } = res.locals;

  const services = getPlatformServices(platform.code);
  const templates = getPlatformTemplates(platform.code);
  const provider = getProvider(platform.code);

  if (provider) {
    passport.use(platform.code, provider);
    refresh.use(platform.code, provider);
  }

  res.locals.services = services;
  res.locals.templates = templates;

  next();
};

export default resolveHandler;
