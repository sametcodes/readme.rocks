"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {string} query - The GraphQL query to send to the GitHub API
 * @returns {Promise<any>} - The response from the GitHub API
 * @throws {Error} - If the response is not a 2xx status code
 */
function request(query, connection) {
  return fetch("https://app.daily.dev/api/graphql", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => {
      var _a;
      if (
        (_a = res.headers.get("content-type")) === null || _a === void 0
          ? void 0
          : _a.includes("application/json")
      ) {
        if (
          String(res.status).startsWith("4") ||
          String(res.status).startsWith("5")
        ) {
          return res.json().then((res) => {
            throw new Error(res.message);
          });
        }
        if (String(res.status).startsWith("2")) {
          return res.json();
        }
      }
      return res.text();
    })
    .then((res) => {
      if (res.error_id) {
        throw new Error(res.error_message);
      }
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      return { success: true, data: res };
    })
    .catch((err) => {
      return {
        success: false,
        data: null,
        error: {
          error: true,
          message: err.message,
          code: 500,
        },
      };
    });
}
exports.default = request;
