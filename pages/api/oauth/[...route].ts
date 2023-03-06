import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { generateRandomString } from "@/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { providers } from "@/services/oauth";
import actions from "@/services/oauth/actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.redirect("/login");

  const [action, platform]: string[] = req.query.route as string[];

  if (req.method !== "GET") return res.status(405).end();
  if (Object.keys(providers).indexOf(platform) === -1)
    return res.status(404).send("Not Found");

  if (action === "callback") {
    const provider = providers[platform];
    const params = provider.getTokenParam(provider, req.query);

    try {
      const accessToken = await provider.authorization.getToken(params);

      const profile = await provider.getProfile(accessToken.token);
      if (!profile) return res.redirect("/login");

      await actions.signin({ accessToken, session, provider, profile });
      return res.redirect("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Access Token Error", error.message);
        return res.send(error.message);
      }
    }
  }

  if (action === "connect") {
    const provider = providers[platform];
    if (provider.connect_url) {
      return res.redirect(provider.connect_url);
    }

    const redirect_uri = provider.authorization.authorizeURL({
      redirect_uri: provider.redirect_uri,
      scope: provider.scope,
      state: generateRandomString(),
    });
    return res.redirect(redirect_uri);
  }

  if (action === "session") {
    try {
      const connection = await actions.getConnections({ session, platform });
      return res.json(connection);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(404).send(err.message);
      }

      return res.status(500).send("Internal Server Error");
    }
  }

  return res.status(404).send("Not Found");
}
