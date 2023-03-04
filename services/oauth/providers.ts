import { AuthorizationCode, AccessToken, Token } from "simple-oauth2";

export type ConnectionProfile = {
  name: string;
  email: string;
  image: string;
};

export type Provider = {
  code: string;
  client: {
    id: string;
    secret: string;
  };
  authorization: AuthorizationCode;
  getTokenParam: (
    provider: any,
    params: any
  ) => {
    code: string;
    grant_type: string;
    client_secret: string;
    client_id: string;
    redirect_uri: string;
  };
  getProfile: (token: Token) => Promise<ConnectionProfile | undefined>;
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
    getTokenParam: (provider, params) => {
      return {
        code: params.code as string,
        grant_type: "authorization_code",
        client_secret: provider.client.secret,
        client_id: provider.client.id,
        redirect_uri: provider.redirect_uri,
      };
    },
    getProfile: async (token) => {
      try {
        const response = await fetch(
          "https://wakatime.com/api/v1/users/current",
          {
            headers: { Authorization: `Bearer ${token.access_token}` },
          }
        );
        const { data } = await response.json();

        return {
          name: data.full_name || data.display_name,
          email: data.email,
          image: data.photo,
        };
      } catch (err) {
        if (err instanceof Error)
          console.error(`Error getting profile from wakatime: ${err.message}`);
      }
    },
    redirect_uri: `${process.env.AUTH_URL}/api/oauth/callback/wakatime`,
    scope: "email,read_stats,read_logged_time",
  },
};

export default providers;
