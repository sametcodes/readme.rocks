import * as codewars from "./codewars/query";
import * as github from "./github/query";
import * as stackoverflow from "./stackoverflow/query";
import * as wakatime from "./wakatime/query";
import * as devto from "./devto/query";
import * as dailydev from "./dailydev/query";

import * as codewars_view from "./codewars/view";
import * as github_view from "./github/view";
import * as stackoverflow_view from "./stackoverflow/view";
import * as wakatime_view from "./wakatime/view";
import * as devto_view from "./devto/view";
import * as dailydev_view from "./dailydev/view";

export { codewars, github, stackoverflow, wakatime, devto };

export const getPlatformServices = (platform: string) => {
  switch (platform) {
    case "github":
      return github;
    case "stackoverflow":
      return stackoverflow;
    case "wakatime":
      return wakatime;
    case "codewars":
      return codewars;
    case "devto":
      return devto;
    case "dailydev":
      return dailydev;
    default:
      return null;
  }
};

export const getPlatformTemplates = (platform: string) => {
  switch (platform) {
    case "github":
      return github_view;
    case "stackoverflow":
      return stackoverflow_view;
    case "wakatime":
      return wakatime_view;
    case "codewars":
      return codewars_view;
    case "devto":
      return devto_view;
    case "dailydev":
      return dailydev_view;
    default:
      return null;
  }
};
