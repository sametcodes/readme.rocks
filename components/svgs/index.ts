import * as codewars from "./codewars";
import * as github from "./github";
import * as stackoverflow from "./stackoverflow";
import * as wakatime from "./wakatime";

export const getPlatformTemplates = (platform: string) => {
  switch (platform) {
    case "github":
      return github;
    case "stackoverflow":
      return stackoverflow;
    case "wakatime":
      return wakatime;
    case "codewars":
      return codewars;
    default:
      return null;
  }
};
