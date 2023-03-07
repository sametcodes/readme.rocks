import * as services from "@/services/platform/stackoverflow";
import * as templates from "@/components/svgs/stackoverflow";

import handlePlatformAPI from "@/services/api/handler";

import nextConnect from "next-connect";
import OAuthProviders from "@/services/oauth/providers";
import passport from "passport";
import refresh from "passport-oauth2-refresh";

passport.use("stackoverflow", OAuthProviders.StackOverflow);
refresh.use("stackoverflow", OAuthProviders.StackOverflow);
export default nextConnect()
  .use(passport.initialize())
  .get(handlePlatformAPI("stackoverflow", services, templates));
