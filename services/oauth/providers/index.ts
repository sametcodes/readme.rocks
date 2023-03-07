import Github from "./github";
import StackOverflow from "./stackoverflow";
import Wakatime from "./wakatime";

const OAuthProviders = {
  Github,
  StackOverflow,
  Wakatime,
};

export const availableOAuthProviders = Object.values(OAuthProviders).map(
  (provider) => provider.name
);
export default OAuthProviders;
