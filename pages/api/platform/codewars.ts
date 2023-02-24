import type { NextApiRequest, NextApiResponse } from "next";

import * as services from "@services/platform/codewars";
import * as templates from "@components/codewars";
import { getPlatformResponse } from "@services/platform/response";

import { getConfigByUser } from "@services/data/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = req.query.uid as string;
  if (!uid)
    return res
      .status(400)
      .json({ message: "Bad request: uid parameter is missing" });
  const userConfigs = await getConfigByUser({ payload: { uid } });
  if (!userConfigs) return res.status(404).json({ message: "No user config" });

  const result = await getPlatformResponse(req.query, services, templates);
  if (result.success === false)
    return res.status(result.status).json({ message: result.error });

  res.setHeader("Content-Type", result.contentType || "image/svg+xml");
  return res.status(result.status).send(result.data);
}
