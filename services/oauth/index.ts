import { AuthorizationCode, AccessToken, Token } from "simple-oauth2";
import wakatime from "./providers/wakatime";
import github from "./providers/github";
import stackoverflow from "./providers/stackoverflow";

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
    redirect_uri: string;

    client_id?: string;
    client_secret?: string;

    state?: string;
    grant_type?: string;
    login?: string;
    allow_signup?: boolean;
  };
  connect_url?: string;
  getProfile: (token: Token) => Promise<ConnectionProfile | undefined>;
  redirect_uri: string;
  scope: string;
};

export const providers: { [key: string]: Provider } = {
  wakatime,
  github,
  stackoverflow,
};
