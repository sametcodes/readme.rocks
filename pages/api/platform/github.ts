import * as services from "@/services/platform/github";
import * as templates from "@/components/svgs/github";

import handlePlatformAPI from "@/services/api/handler";

import nextConnect from "next-connect";
import OAuthProviders from "@/services/oauth/providers";
import passport from "passport";
import refresh from "passport-oauth2-refresh";

passport.use("github", OAuthProviders.Github);
refresh.use("github", OAuthProviders.Github);
export default nextConnect()
  .use(passport.initialize())
  .get(handlePlatformAPI("github", services, templates));
