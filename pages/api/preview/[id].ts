import nextConnect from "next-connect";
import passport from "passport";

import {
  validatePreviewRequest,
  validatePreviewBody,
} from "@/middlewares/api/preview";
import { resolveHandler } from "@/middlewares/api";
import handlePlatformAPI from "@/services/api/handler";
import { validateAccessToken, loadPassport } from "@/middlewares/api/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect()
  .use(validatePreviewRequest)
  .use(passport.initialize())
  .use(resolveHandler)
  .use(loadPassport)
  .use(validateAccessToken)
  .use(validatePreviewBody)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const { query, services, templates, connection } = res.locals;
    return handlePlatformAPI(
      services,
      templates,
      query.name,
      body,
      connection
    )(req, res);
  });
