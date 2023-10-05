import { NextApiRequest, NextApiResponse } from "next";

export const setCacheControl = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const {
    query: { cache_time, _vercel_no_cache },
  } = res.locals;

  res.setHeader("Cache-Control", "max-age=60");
  if (_vercel_no_cache === undefined) {
    res.setHeader("CDN-Cache-Control", `max-age=${cache_time}`);
    res.setHeader("Vercel-CDN-Cache-Control", `max-age=${cache_time}`);
  }

  next();
};
