// @ts-ignore
import { Strategy } from "passport-stack-exchange";

const strategy = new Strategy(
  {
    clientID: process.env.STACKAPPS_CLIENT_ID as string,
    clientSecret: process.env.STACKAPPS_SECRET as string,
    callbackURL: `${process.env.NEXTAUTH_URL}/api/oauth/callback/stackoverflow`,
    stackAppsKey: process.env.STACKAPPS_KEY as string,
    site: "stackoverflow",
    scope: "no_expiry,private_info",
  },
  (
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: any,
    cb: (error: null, profile: any) => void
  ) => {
    return cb(null, {
      token: {
        access_token: accessToken,
        refresh_token: accessToken,
        expires_at: Date.now() + Number(params.expires || 9999999999) * 1000,
        scope: "",
        token_type: "bearer",
      },
      profile: {
        name: profile.displayName,
        email: "",
        image: profile.photos[0],
      },
    });
  }
);

export default strategy;
