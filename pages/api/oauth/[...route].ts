import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import actions from "@/services/oauth/actions";
import passport from "passport";
import nextConnect from "next-connect";

import StackOverflowProvider from "@/services/oauth/providers/stackoverflow";
import GithubProvider from "@/services/oauth/providers/github";
import WakatimeProvider from "@/services/oauth/providers/wakatime";

async function handler(req: NextApiRequest, res: NextApiResponse, next: any) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.redirect("/login");

  const [action, platform]: Array<string> = req.query.route as Array<string>;

  if (req.method !== "GET") return res.status(405).end();

  if (action === "connect") {
    return passport.authenticate(platform)(req, res);
  }

  if (action === "callback") {
    return passport.authenticate(
      platform,
      {
        failureRedirect: "/login",
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

        return res.redirect("/");
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
      return res.redirect("/login");
    } catch (err) {
      if (err instanceof Error) {
        return res.status(404).send(err.message);
      }
      return res.status(500).send("Internal Server Error");
    }
  }

  return res.status(404).send("Not Found");
}

passport.use("stackoverflow", StackOverflowProvider);
passport.use("github", GithubProvider);
passport.use("wakatime", WakatimeProvider);

export default nextConnect()
  .use(passport.initialize())
  .use((req: NextApiRequest, res: NextApiResponse, next: any) => {
    return handler(req, res, next);
  });
