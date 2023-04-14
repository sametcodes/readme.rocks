export * as query from "./query";
export * as view from "./view";
export * as sample from "./view/sample";

import * as query_validations from "./query/validations";
import * as view_validations from "./view/validations";

export const validations = {
  query: query_validations,
  view: view_validations,
};
