import type { NextApiRequest, NextApiResponse } from 'next'
import * as github from '@services/platform/github'

type Method = "getContributions" | "getPopularContributions" | "getContributionsSummary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req.query;
  if (method === undefined || typeof method !== 'string') return res.status(400).json({ message: 'Bad Request' });

  if (Object.keys(github).includes(method)) {
    const response = await github[method as Method]();

    if (response.success === false) return res.status(500).json(response.error);
    return res.status(200).json(response.data);
  }

  return res.status(404).json({ error: true, message: 'Method not found' })

}
