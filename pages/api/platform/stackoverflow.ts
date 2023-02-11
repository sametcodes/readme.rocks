import type { NextApiRequest, NextApiResponse } from 'next'
import * as stackoverflow from '@services/platform/stackoverflow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await stackoverflow.getReputation();

  if(response.success === false) return res.status(500).json(response.error);
  return res.status(200).json(response.data);

}
