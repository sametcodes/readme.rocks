/**
 * @param {string} path - The path to send the request to
 * @returns {Promise<any>} - The response from the CodeWars API
 * @throws {Error} - If the response is not JSON
 * @throws {Error} - If the response is an error
 */

export default function request(path: string): Promise<any> {
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

      if (res.success === false) {
        throw new Error(res.message);
      }

      return res;
    });
}
