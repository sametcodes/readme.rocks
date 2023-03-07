import * as services from "@/services/platform/github";
import * as templates from "@/components/svgs/github";

import handlePlatformAPI from "@/services/api/handler";

import nextConnect from "next-connect";
import GithubProvider from "@/services/oauth/providers/github";
import passport from "passport";
import refresh from "passport-oauth2-refresh";

passport.use("github", GithubProvider);
refresh.use("github", GithubProvider);
export default nextConnect()
  .use(passport.initialize())
  .get(handlePlatformAPI("github", services, templates));
