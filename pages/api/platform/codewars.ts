import type { NextApiRequest, NextApiResponse } from 'next'
import * as codewars from '@services/platform/codewars';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await codewars.getUser();

  if(response.success === false) return res.status(500).json(response.error);
  return res.status(200).json(response.data);
}
