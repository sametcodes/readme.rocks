import { AuthorizationCode } from "simple-oauth2";
import { Provider } from "@/services/oauth";

const config: Provider = {
  code: "stackoverflow",
  client: {
    id: process.env.STACKAPPS_CLIENT_ID as string,
    secret: process.env.STACKAPPS_SECRET as string,
  },
  authorization: new AuthorizationCode({
    client: {
      id: process.env.STACKAPPS_CLIENT_ID as string,
      secret: process.env.STACKAPPS_SECRET as string,
    },
    auth: {
      tokenHost: "https://stackoverflow.com/",
      authorizePath: "/oauth",
      tokenPath: "/oauth/access_token",
    },
  }),
  getTokenParam: (provider, params) => {
    return {
      client_id: provider.client.id,
      client_secret: provider.client.secret,
      code: params.code,
      redirect_uri: provider.redirect_uri,
    };
  },
  getProfile: async (token) => {
    return Promise.resolve({
      name: "test",
      email: "",
      image: "",
    });
  },
  redirect_uri: `${process.env.NEXTAUTH_URL}/api/oauth/callback/stackoverflow`,
  scope: "private_info",
};

export default config;
