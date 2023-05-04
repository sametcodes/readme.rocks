import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.VERCEL !== "1")
    return res
      .status(403)
      .json({
        success: false,
        message: "This endpoint is only available on Vercel.",
      });

  if (
    process.env.VERCEL_ENV &&
    ["production", "preview"].includes(process.env.VERCEL_ENV) === false
  )
    return res
      .status(403)
      .json({
        success: false,
        message: "This endpoint is only available on production and preview.",
      });

  const publicQueryWakeUp = fetch(
    `https://${process.env.VERCEL_URL}${process.env.WAKEUP_PUBLIC_QUERY_PATH}`
  ).then((response) => {
    if (response.status !== 200) {
      return `Failed to wake up public query ${process.env.VERCEL_URL} with status ${response.status}`;
    } else {
      return "Woke up public query.";
    }
  });

  const privateQueryWakeUp = fetch(
    `https://${process.env.VERCEL_URL}${process.env.WAKEUP_PRIVATE_QUERY_PATH}`
  ).then((response) => {
    if (response.status !== 200) {
      return `Failed to wake up private query ${process.env.VERCEL_URL} with status ${response.status}`;
    } else {
      return "Woke up private query.";
    }
  });

  Promise.all([publicQueryWakeUp, privateQueryWakeUp])
    .then((results) => {
      res.status(200).json({
        success: true,
        message: results,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
}
