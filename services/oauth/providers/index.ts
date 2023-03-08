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

export const getProvider = (provider: string) => {
  switch (provider) {
    case "github":
      return Github;
    case "stackoverflow":
      return StackOverflow;
    case "wakatime":
      return Wakatime;
    default:
      return null;
  }
};

export default OAuthProviders;
