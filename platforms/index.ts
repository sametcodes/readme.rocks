import * as codewars from "./codewars";
import * as github from "./github";
import * as stackoverflow from "./stackoverflow";
import * as wakatime from "./wakatime";
import * as devto from "./devto";
import * as dailydev from "./dailydev";
import { AnyObject } from "yup";

export const getPlatformServices = (platform: string) => {
  switch (platform) {
    case "github":
      return github.query;
    case "stackoverflow":
      return stackoverflow.query;
    case "wakatime":
      return wakatime.query;
    case "codewars":
      return codewars.query;
    case "devto":
      return devto.query;
    case "dailydev":
      return dailydev.query;
    default:
      return null;
  }
};

export const getPlatformTemplates = (platform: string) => {
  switch (platform) {
    case "github":
      return github.view;
    case "stackoverflow":
      return stackoverflow.view;
    case "wakatime":
      return wakatime.view;
    case "codewars":
      return codewars.view;
    case "devto":
      return devto.view;
    case "dailydev":
      return dailydev.view;
    default:
      return null;
  }
};

export const getPlatformValidations = (
  platform: string
): { query: AnyObject; view: AnyObject } | null => {
  switch (platform) {
    case "github":
      return github.validations;
    case "stackoverflow":
      return stackoverflow.validations;
    case "wakatime":
      return wakatime.validations;
    case "codewars":
      return codewars.validations;
    case "devto":
      return devto.validations;
    case "dailydev":
      return dailydev.validations;
    default:
      return null;
  }
};
