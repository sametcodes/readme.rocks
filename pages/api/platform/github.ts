import type { NextApiRequest, NextApiResponse } from 'next'
import * as github from '@services/platform/github'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await github.getContributions();

  if(response.success === false) return res.status(500).json(response.error);
  return res.status(200).json(response.data);
}
