import { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as services from "@/services/data";

import methods from "@/services/data/methods";
import type * as methodTypes from "@/services/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const method = req.method as keyof typeof methods;
  const method_services = methods[method];

  const service = req.query.service as keyof typeof services;
  if (!service)
    return res
      .status(400)
      .json({ message: "Bad request: service parameter is missing" });
  if (!method_services.includes(service))
    return res
      .status(400)
      .json({ message: "Bad request: method not allowed for this service" });

  const dataService = services[service];
  if (!dataService)
    return res
      .status(400)
      .json({ message: "Bad request: unknown data API service" });

  try {
    const result = await dataService({ session: session, payload: req.body });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}
