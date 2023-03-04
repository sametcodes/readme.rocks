/**
 * @param {string} query - The GraphQL query to send to the GitHub API
 * @returns {Promise<any>} - The response from the GitHub API
 * @throws {Error} - If the response is not a 2xx status code
 */

export default function request(query: string, token: string) {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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
}
