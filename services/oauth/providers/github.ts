import { Strategy } from "passport-github2";

const strategy = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: `${process.env.NEXTAUTH_URL}/api/oauth/callback/github`,
    scope: ["read:user", "user:email", "repo"],
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
        refresh_token: refreshToken,
        expires_at: Date.now() + Number(params.expires_in) * 1000,
        refresh_token_expires_at:
          Date.now() + Number(params.refresh_token_expires_in) * 1000,
        scope: params.scope,
        token_type: params.token_type,
      },
      profile: {
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      },
    });
  }
);

strategy.name = "github";
export default strategy;
