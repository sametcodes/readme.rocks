import nextConnect from "next-connect";
import passport from "passport";

import handlePlatformAPI from "@/services/api/handler";

import { validatePrivateRequest } from "@/middlewares/api/private";
import { validateAccessToken, loadPassport } from "@/middlewares/api/auth";
import { resolveHandler } from "@/middlewares/api";
import { setCacheControl } from "@/middlewares/api/cache";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * This is the handler for the private API endpoint.
 **/
export default nextConnect()
  .use(validatePrivateRequest)
  .use(passport.initialize())
  .use(resolveHandler)
  .use(loadPassport)
  .use(validateAccessToken)
  .use(setCacheControl)
  .get((req: NextApiRequest, res: NextApiResponse) => {
    const { services, templates, connection, query, config } = res.locals;
    return handlePlatformAPI(
      services,
      templates,
      query.name,
      config,
      connection
    )(req, res);
  });
