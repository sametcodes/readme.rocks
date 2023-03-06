import { AuthorizationCode } from "simple-oauth2";
import { Provider } from "@services/oauth";

const config: Provider = {
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
      authorizePath: "/oauth/authorize",
      tokenPath: "/oauth/token",
    },
  }),
  getTokenParam: (provider, params) => {
    return {
      code: params.code as string,
      grant_type: "authorization_code",
      client_secret: provider.client.secret,
      state: params.state as string,
      client_id: provider.client.id,
      redirect_uri: provider.redirect_uri,
    };
  },
  getProfile: async (token) => {
    try {
      const response = await fetch(
        "https://wakatime.com/api/v1/users/current",
        { headers: { Authorization: `Bearer ${token.access_token}` } }
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
  redirect_uri: `${process.env.NEXTAUTH_URL}/api/oauth/callback/wakatime`,
  scope: "email,read_stats,read_logged_time",
};

export default config;
