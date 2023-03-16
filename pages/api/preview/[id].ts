import nextConnect from "next-connect";
import passport from "passport";
import handlePlatformAPI, {
  loadConfigForPreview,
  validateAccessToken,
} from "@/services/api/handler";
import resolveHandler from "@/services/api/resolver";
import { shapeDataAPISchema } from "@/services/data/validations";
import { object, ValidationError } from "yup";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect()
  .use(loadConfigForPreview)
  .use(passport.initialize())
  .use(resolveHandler)
  .use(validateAccessToken)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const {
      platformQueryConfig: { platform },
      services,
      templates,
    } = res.locals;
    res.locals.platformQueryConfig = {
      ...res.locals.platformQueryConfig,
      ...body,
    };

    const query = res.locals.platformQueryConfig.platformQuery.name;
    const schema = shapeDataAPISchema(query);

    try {
      await schema.validate(body, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.inner
          .map((err) => ({ name: err.path, message: err.message }))
          .reduce(
            (acc: any, err: any) => ({ ...acc, [err.name]: err.message }),
            {}
          );
        return res.status(400).json({ errors });
      }
    }
    return handlePlatformAPI(platform.code, services, templates)(req, res);
  });
