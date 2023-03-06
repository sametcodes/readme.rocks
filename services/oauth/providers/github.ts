import { AuthorizationCode } from "simple-oauth2";
import { Provider } from "@services/oauth";

const config: Provider = {
  code: "github",
  client: {
    id: process.env.GITHUB_CLIENT_ID as string,
    secret: process.env.GITHUB_CLIENT_SECRET as string,
  },
  authorization: new AuthorizationCode({
    client: {
      id: process.env.GITHUB_CLIENT_ID as string,
      secret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    auth: {
      tokenHost: "https://github.com",
      authorizePath: "/login/oauth/authorize",
      tokenPath: "/login/oauth/access_token",
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
      const response = await fetch("https://api.github.com/user", {
        headers: { Authorization: `token ${token.access_token}` },
      });
      const data = await response.json();

      return {
        name: data.name || data.login,
        email: data.email,
        image: data.avatar_url,
      };
    } catch (err) {
      if (err instanceof Error)
        console.error(`Error getting profile from github: ${err.message}`);
    }
  },
  connect_url: process.env.GITHUB_CLIENT_INSTALL_URL,
  redirect_uri: `${process.env.NEXTAUTH_URL}/api/oauth/callback/github`,
  scope: "read:user user:email repo",
};

export default config;
