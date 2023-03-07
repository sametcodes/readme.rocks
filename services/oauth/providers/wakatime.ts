import OAuth2Strategy from "passport-oauth2";

OAuth2Strategy.prototype.userProfile = function (
  accessToken: string,
  done: (error: any, profile: any) => void
) {
  // @ts-ignore
  this._oauth2._request(
    "GET",
    "https://wakatime.com/api/v1/users/current",
    null,
    null,
    accessToken,
    // @ts-ignore
    (err: any, data: string) => {
      if (err) {
        return done(err, null);
      }
      try {
        const json = JSON.parse(data);
        const profile = {
          provider: "wakatime",
          id: json.data.id,
          displayName: json.data.display_name,
          emails: [{ value: json.data.email }],
          photos: [{ value: json.data.photo }],
        };
        done(null, profile);
      } catch (err) {
        done(err, null);
      }
    }
  );
};

const strategy = new OAuth2Strategy(
  {
    authorizationURL: "https://wakatime.com/oauth/authorize",
    tokenURL: "https://wakatime.com/oauth/token",
    clientID: process.env.WAKATIME_CLIENT_ID as string,
    clientSecret: process.env.WAKATIME_SECRET as string,
    callbackURL: `${process.env.NEXTAUTH_URL}/api/oauth/callback/wakatime`,
    scope: "email,read_stats,read_logged_time",
  },
  function (
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: any,
    cb: (error: null, profile: any) => void
  ) {
    return cb(null, {
      token: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: Date.now() + Number(params.expires_in) * 1000,
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

strategy.name = "wakatime";
export default strategy;
