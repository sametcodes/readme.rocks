import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import passport from "passport";
import nextConnect from "next-connect";
import OAuthProviders from "@/services/oauth/providers";
import actions from "@/services/oauth/actions";
import { PlatformCode } from "@prisma/client";

const redirects: { [key: string]: string } = {};

async function handler(req: NextApiRequest, res: NextApiResponse, next: any) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.redirect("/");

  const [action, platform] = req.query.route as [string, PlatformCode];

  if (req.method !== "GET") return res.status(405).end();

  if (action === "connect") {
    if (req.query.redirect) {
      redirects[session.user.id] = req.query.redirect as string;
    }

    return passport.authenticate(platform)(req, res);
  }

  if (action === "callback") {
    return passport.authenticate(
      platform,
      {
        failureRedirect: "/",
      },
      async (error: Error | null, data: any) => {
        if (error) {
          return res.status(500).send(error.message);
        }

        await actions.connect({
          token: data.token,
          profile: data.profile,
          session,
          platformCode: platform,
        });

        if (redirects[session.user.id]) {
          return res.redirect(redirects[session.user.id]);
        }

        return res.redirect("/connect");
      }
    )(req, res, next);
  }

  if (action === "session") {
    try {
      const connection = await actions.getConnections({
        session,
        platformCode: platform,
      });
      if (!connection) {
        return res.status(403).send("Forbidden");
      }
      return res.json(connection);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(404).send(err.message);
      }
      return res.status(500).send("Internal Server Error");
    }
  }

  if (action === "disconnect") {
    try {
      await actions.disconnect({ session, platformCode: platform });
      return res.redirect("/connect");
    } catch (err) {
      if (err instanceof Error) {
        return res.status(404).send(err.message);
      }
      return res.status(500).send("Internal Server Error");
    }
  }

  return res.status(404).send("Not Found");
}

passport.use("stackoverflow", OAuthProviders.StackOverflow);
passport.use("github", OAuthProviders.Github);
passport.use("wakatime", OAuthProviders.Wakatime);

export default nextConnect()
  .use(passport.initialize())
  .use((req: NextApiRequest, res: NextApiResponse, next: any) => {
    return handler(req, res, next);
  });
