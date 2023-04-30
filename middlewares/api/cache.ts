import { NextApiRequest, NextApiResponse } from "next";

export const setCacheControl = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const {
    query: { cache_time },
  } = res.locals;
  const cacheValue = `max-age=1800, s-maxage=${
    cache_time || 1800
  }, stale-while-revalidate=604800`;
  res.setHeader("Cache-Control", cacheValue);

  if (req.query._vercel_no_cache && req.query._vercel_no_cache === "1") {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1, stale-while-revalidate=59"
    );
  }
  next();
};
