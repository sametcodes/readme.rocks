import nextConnect from "next-connect";
import passport from "passport";

import handlePlatformAPI from "@/services/api/handler";

import {
  validatePrivateBody,
  validatePrivateRequest,
} from "@/middlewares/api/private";
import { validateAccessToken, loadPassport } from "@/middlewares/api/auth";
import { resolveHandler } from "@/middlewares/api";
// import { setCacheControl } from "@/middlewares/api/cache";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect()
  .use(validatePrivateRequest)
  .use(validatePrivateBody)
  .use(passport.initialize())
  .use(resolveHandler)
  .use(loadPassport)
  .use(validateAccessToken)
  // .use(setCacheControl)
  .get((req: NextApiRequest, res: NextApiResponse) => {
    const { services, templates, connection, query, config } = res.locals;
    return handlePlatformAPI(
      services,
      templates,
      query,
      config,
      connection
    )(req, res);
  });
