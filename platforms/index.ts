import * as codewars from "./codewars";
import * as github from "./github";
import * as stackoverflow from "./stackoverflow";
import * as wakatime from "./wakatime";
import * as devto from "./devto";
import * as dailydev from "./dailydev";
import * as hackernews from "./hackernews";
import * as leetcode from "./leetcode";

export const services = {
  github: github.query,
  stackoverflow: stackoverflow.query,
  wakatime: wakatime.query,
  codewars: codewars.query,
  devto: devto.query,
  dailydev: dailydev.query,
  hackernews: hackernews.query,
  leetcode: leetcode.query,
};

export const templates = {
  github: github.view,
  stackoverflow: stackoverflow.view,
  wakatime: wakatime.view,
  codewars: codewars.view,
  devto: devto.view,
  dailydev: dailydev.view,
  hackernews: hackernews.view,
  leetcode: leetcode.view,
};

export const validations = {
  github: github.validations,
  stackoverflow: stackoverflow.validations,
  wakatime: wakatime.validations,
  codewars: codewars.validations,
  devto: devto.validations,
  dailydev: dailydev.validations,
  hackernews: hackernews.validations,
  leetcode: leetcode.validations,
};

export const samples = {
  github: github.sample,
  stackoverflow: stackoverflow.sample,
  wakatime: wakatime.sample,
  codewars: codewars.sample,
  devto: devto.sample,
  dailydev: dailydev.sample,
  hackernews: hackernews.sample,
  leetcode: leetcode.sample,
};
