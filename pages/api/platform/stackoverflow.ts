import * as services from "@services/platform/stackoverflow";
import * as templates from "@components/svgs/stackoverflow";

import handlePlatformAPI from "@services/api/handler";

import nextConnect from "next-connect";
import StackOverflowProvider from "@services/oauth/providers/stackoverflow";
import passport from "passport";
import refresh from "passport-oauth2-refresh";

passport.use("stackoverflow", StackOverflowProvider);
refresh.use("stackoverflow", StackOverflowProvider);
export default nextConnect()
  .use(passport.initialize())
  .get(handlePlatformAPI("stackoverflow", services, templates));
