import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { generateRandomString } from "@utils";
import { authOptions } from "@pages/api/auth/[...nextauth]";

import Providers from "@services/oauth/providers";
import actions from "@services/oauth/actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.redirect("/login");

  const [action, platform]: string[] = req.query.route as string[];

  if (action === "callback") {
    const provider = Providers[platform];
    const params = provider.getTokenParam(provider, req.query);

    try {
      const accessToken = await provider.authorization.getToken(params);
      actions.signin({ accessToken, session, provider });

      return res.redirect("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Access Token Error", error.message);
        return res.send(error.message);
      }
    }
  }

  if (action === "signin") {
    const provider = Providers[platform];
    const redirect_uri = provider.authorization.authorizeURL({
      redirect_uri: provider.redirect_uri,
      scope: provider.scope,
      state: generateRandomString(),
    });
    return res.redirect(redirect_uri);
  }

  return res.status(404).send("Not Found");
}
