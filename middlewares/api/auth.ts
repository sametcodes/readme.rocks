import { NextApiRequest, NextApiResponse } from "next";
import { availableOAuthProviders } from "@/services/oauth/providers";
import actions from "@/services/oauth/actions";
import { Connection } from "@prisma/client";
import prisma from "@/services/prisma";

import passport from "passport";
import refresh from "passport-oauth2-refresh";
import { getProvider } from "@/services/oauth/providers";
import { sendFallbackResponse } from "@/services/api/response";

export const validateAccessToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const {
    config: { userId, platformId },
    platform,
  } = res.locals;

  if (!availableOAuthProviders.includes(platform.code)) return next();

  const connection = await prisma.connection.findFirst({
    where: { userId, platformId },
  });

  if (!connection)
    return sendFallbackResponse(res, {
      title: "Not authorized",
      message:
        "User disconnected the account that the query was configured with.",
    });

  res.locals.connection = connection;

  if (connection.expires_at && Date.now() > connection.expires_at) {
    try {
      await actions.refreshAccessToken(platform.code, connection);
      res.locals.connection = (await prisma.connection.findFirst({
        where: { id: connection.id },
      })) as Connection;
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  }

  return next();
};

export const loadPassport = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { platform } = res.locals;
  const provider = getProvider(platform.code);

  if (provider) {
    passport.use(platform.code, provider);
    refresh.use(platform.code, provider);
  }

  next();
};
