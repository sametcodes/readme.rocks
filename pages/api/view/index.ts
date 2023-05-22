import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { resolveHandler } from "@/middlewares/api";
import {
  validatePublicRequest,
  validatePublicBody,
} from "@/middlewares/api/public";
import handlePlatformAPI from "@/services/api/handler";

export default nextConnect()
  .use(validatePublicRequest)
  .use(validatePublicBody)
  .use(resolveHandler)
  // .use(setCacheControl)
  .get((req: NextApiRequest, res: NextApiResponse) => {
    const { services, templates, query, config } = res.locals;
    return handlePlatformAPI(services, templates, query, config)(req, res);
  });
