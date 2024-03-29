import { NextApiRequest, NextApiResponse } from "next";

export const setCacheControl = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const {
    query: { cache_time, _vercel_no_cache },
  } = res.locals;

  res.setHeader(
    "Cache-Control",
    `max-age=${cache_time}, stale-while-revalidate=2592000`
  );
  if (_vercel_no_cache === undefined) {
    res.setHeader(
      "CDN-Cache-Control",
      `max-age=${cache_time}, stale-while-revalidate=2592000`
    );
    res.setHeader(
      "Vercel-CDN-Cache-Control",
      `max-age=${cache_time}, stale-while-revalidate=2592000`
    );
  }

  next();
};
