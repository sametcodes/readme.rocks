import * as services from "@/services/platform/wakatime";
import * as templates from "@/components/svgs/wakatime";

import handlePlatformAPI from "@/services/api/handler";

import nextConnect from "next-connect";
import OAuthProviders from "@/services/oauth/providers";
import passport from "passport";
import refresh from "passport-oauth2-refresh";

passport.use("wakatime", OAuthProviders.Wakatime);
refresh.use("wakatime", OAuthProviders.Wakatime);
export default nextConnect()
  .use(passport.initialize())
  .get(handlePlatformAPI("wakatime", services, templates));
