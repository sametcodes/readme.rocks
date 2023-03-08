import nextConnect from "next-connect";
import passport from "passport";
import handlePlatformAPI, {
  validateRequest,
  validateAccessToken,
} from "@/services/api/handler";
import resolveHandler from "@/services/api/resolver";

export default nextConnect()
  .use(validateRequest)
  .use(passport.initialize())
  .use(resolveHandler)
  .use(validateAccessToken)
  .get((req, res) => {
    // @ts-ignore
    const {
      platformQueryConfig: { platform },
      services,
      templates,
      // @ts-ignore
    } = res.locals;
    // @ts-ignore
    return handlePlatformAPI(platform.code, services, templates)(req, res);
  });
