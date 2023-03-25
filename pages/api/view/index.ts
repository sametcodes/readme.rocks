import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { resolveHandler } from "@/middlewares/api";
import { validatePublicRequest } from "@/middlewares/api/public";
import { setCacheControl } from "@/middlewares/api/cache";
import handlePlatformAPI from "@/services/api/handler";

/**
 * This is the handler for the public API endpoint.
 **/
export default nextConnect()
  .use(validatePublicRequest)
  .use(resolveHandler)
  .use(setCacheControl)
  .get((req: NextApiRequest, res: NextApiResponse) => {
    const { services, templates, query, config } = res.locals;
    return handlePlatformAPI(services, templates, query.name, config)(req, res);
  });
