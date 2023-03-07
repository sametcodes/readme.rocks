import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getPlatformResponse } from "@services/platform/response";
import prisma from "@services/prisma";

import { requestNewAccessToken } from "passport-oauth2-refresh";
import actions from "@services/oauth/actions";
import { Connection } from "@prisma/client";

type PlatformAPIHandler = {
  (platformCode: string, services: any, templates: any): NextApiHandler;
};

const handlePlatformAPI: PlatformAPIHandler = (
  platformCode,
  services,
  templates
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const uid = req.query.uid as string;
    if (!uid)
      return res
        .status(400)
        .json({ message: "Bad request: uid parameter is missing" });

    const user = await prisma.user.findFirst({ where: { id: uid } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const platform = await prisma.platform.findFirst({
      where: { code: platformCode },
    });
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });

    const userConfig = await prisma.config.findFirst({
      select: { value: true, platform: { select: { name: true } } },
      where: { userId: uid, platformId: platform.id },
    });

    var connection = await prisma.connection.findFirst({
      where: { userId: uid, platformId: platform.id },
    });

    if (!connection)
      return res
        .status(404)
        .json({ message: "User has no connection on this platform" });

    // Refreshing access token
    // TODO: refactor this
    // it should work on the network request level, not on the API layers
    if (connection.expires_at && Date.now() > connection.expires_at) {
      const updated_connection = await new Promise<Connection | Error>(
        (resolve, reject) => {
          if (!connection) return reject("No connection found");
          requestNewAccessToken(
            platformCode,
            connection.refresh_token,
            async (
              err: { statusCode: number; data?: any },
              access_token: string,
              refresh_token: string,
              result: any
            ) => {
              if (err) {
                console.log(err);
                res.status(err.statusCode).json({ message: err.data });
                throw new Error(err.data);
              }

              if (!connection) return reject("No connection found");

              return actions
                .updateConnection({
                  connection,
                  data: {
                    access_token,
                    expires_at: Date.now() + Number(result.expires_in) * 1000,
                  },
                })
                .then(resolve);
            }
          );
        }
      );

      if (updated_connection instanceof Error) return;
      connection = updated_connection;
    }

    const result = await getPlatformResponse(
      req.query,
      services,
      templates,
      connection,
      userConfig
    );

    if (result.success === false)
      return res.status(result.status).json({ message: result.error });

    res.setHeader("Content-Type", result.contentType || "image/svg+xml");
    return res.status(result.status).send(result.data);
  };
};

export default handlePlatformAPI;
