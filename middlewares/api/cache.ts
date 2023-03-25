import { NextApiRequest, NextApiResponse } from "next";

export const setCacheControl = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const {
    query: { cache_time },
  } = res.locals;
  const cache_value = `public, max-age=60, s-maxage=${cache_time}, stale-while-revalidate=${cache_time}`;
  res.setHeader("Cache-Control", cache_value);

  if (req.query._vercel_no_cache && req.query._vercel_no_cache === "1") {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1, stale-while-revalidate=59"
    );
  }

  next();
};
