import { Connection } from "@prisma/client";

/**
 * @param {string} endpoint - The endpoint to send the request to
 * @returns {Promise<any>} - The response from the StackOverflow API
 * @throws {Error} - If the response is not JSON
 */
export default function request(endpoint: string, connection: Connection) {
  return fetch(`https://wakatime.com/api/v1${endpoint}`, {
    headers: {
      Authorization: `Bearer ${connection.access_token}`,
    },
  })
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
}
