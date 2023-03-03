import { AuthorizationCode } from "simple-oauth2";

const { WAKATIME_CLIENT_ID, WAKATIME_SECRET } = process.env;

export type Provider = {
  code: string;
  client: {
    id: string;
    secret: string;
  };
  authorization: AuthorizationCode;
  getTokenParam: (provider: any, params: any) => any;
  redirect_uri: string;
  scope: string;
};

const providers: { [key: string]: Provider } = {
  wakatime: {
    code: "wakatime",
    client: {
      id: process.env.WAKATIME_CLIENT_ID as string,
      secret: process.env.WAKATIME_SECRET as string,
    },
    authorization: new AuthorizationCode({
      client: {
        id: process.env.WAKATIME_CLIENT_ID as string,
        secret: process.env.WAKATIME_SECRET as string,
      },
      auth: {
        tokenHost: "https://wakatime.com",
        tokenPath: "/oauth/token",
        authorizePath: "/oauth/authorize",
      },
    }),
    getTokenParam: (provider: any, params: any) => {
      return {
        code: params.code as string,
        grant_type: "authorization_code",
        client_secret: provider.client.secret,
        client_id: provider.client.id,
        redirect_uri: provider.redirect_uri,
      };
    },
    redirect_uri: `${process.env.AUTH_URL}/api/oauth/callback/wakatime`,
    scope: "email,read_stats,read_logged_time",
  },
};

export default providers;
