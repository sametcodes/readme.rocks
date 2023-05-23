import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as services from "@/services/data";

import methods from "@/services/data/methods";

type ServiceParams = [keyof typeof services, ...Array<string>];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const method = req.method as keyof typeof methods;
  const methodServices = methods[method];

  const [service, ...params] = req.query.service as ServiceParams;

  if (!service)
    return res
      .status(400)
      .json({ message: "Bad request: service parameter is missing" });

  const dataService = services[service];
  if (!dataService)
    return res
      .status(400)
      .json({ message: "Bad request: unknown data API service" });

  if (!methodServices.includes(service))
    return res
      .status(400)
      .json({ message: "Bad request: method not allowed for this service" });

  try {
    const result = await dataService(
      { session, params, payload: req.body },
      { req, res }
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}
