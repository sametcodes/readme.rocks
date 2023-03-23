import * as codewars_queries from "./codewars/query/validations";
import * as codewars_views from "./codewars/view/validations";

import * as github_queries from "./github/query/validations";
import * as github_views from "./github/view/validations";

import * as stackoverflow_queries from "./stackoverflow/query/validations";
import * as stackoverflow_views from "./stackoverflow/view/validations";

import * as wakatime_queries from "./wakatime/query/validations";
import * as wakatime_views from "./wakatime/view/validations";

import * as devto_queries from "./devto/query/validations";
import * as devto_views from "./devto/view/validations";

export const queryValidations = {
  ...codewars_queries,
  ...github_queries,
  ...stackoverflow_queries,
  ...wakatime_queries,
  ...devto_queries,
};

export const viewValidations = {
  ...codewars_views,
  ...github_views,
  ...stackoverflow_views,
  ...wakatime_views,
  ...devto_views,
};
