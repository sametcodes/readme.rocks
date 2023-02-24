import config from "@config/devstats.config";

const GITHUB_PAT = config.github.token;

/**
 * @param {string} endpoint - The endpoint to send the request to
 * @returns {Promise<any>} - The response from the StackOverflow API
 * @throws {Error} - If the response is not JSON
 */
export const stackoverflow = (endpoint: string) => {
  return fetch(`https://api.stackexchange.com/2.2${endpoint}`)
    .then((res) => {
      if (res.headers.get("content-type")?.includes("application/json")) {
        return res.json();
      }

      return res.text();
    })
    .then((res) => {
      if (res.error_id) {
        throw new Error(res.error_message);
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
};

/**
 * @param {string} query - The GraphQL query to send to the GitHub API
 * @returns {Promise<any>} - The response from the GitHub API
 * @throws {Error} - If the response is not a 2xx status code
 */

export const github = async (query: string) => {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_PAT}`,
      Accept: "application/vnd.github.v4.idl",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => {
      if (res.headers.get("content-type")?.includes("application/json")) {
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
};

/**
 * @param {string} path - The path to send the request to
 * @returns {Promise<any>} - The response from the CodeWars API
 * @throws {Error} - If the response is not JSON
 * @throws {Error} - If the response is an error
 */

export const codewars = async (path: string) => {
  return fetch(`https://www.codewars.com/api/v1${path}`)
    .then((res) => {
      if (res.headers.get("content-type")?.includes("application/json")) {
        return res.json();
      }

      return res.text();
    })
    .then((res) => {
      if (res.error_id) {
        throw new Error(res.error_message);
      }

      return {
        success: true,
        data: res,
      };
    })
    .catch((err) => {
      return {
        success: false,
        error: {
          error: true,
          message: err.message,
          code: err.code,
        },
      };
    });
};
