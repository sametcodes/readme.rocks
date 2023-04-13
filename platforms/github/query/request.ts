import { Connection } from "@prisma/client";
/**
 * @param {string} query - The GraphQL query to send to the GitHub API
 * @returns {Promise<any>} - The response from the GitHub API
 * @throws {Error} - If the response is not a 2xx status code
 */

export default function request(query: string, connection: Connection) {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        connection
          ? connection.access_token
          : process.env.GITHUB_PUBLIC_CLIENT_PAT
      }`,
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
          return res.json().then((result) => {
            throw new Error(result.message);
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

      return res;
    });
}
