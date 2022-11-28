import type { NextApiRequest, NextApiResponse } from 'next'
import config from '../../devstats.config'

const CODEWARS_USERNAME = config.codewars.username;
const ENDPOINT = `https://www.codewars.com/api/v1`;

type Data = {
  data: any,
  challenges: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await fetch(`${ENDPOINT}/users/${CODEWARS_USERNAME}`)
    .then(res => res.json());

  const challenges = await fetch(`${ENDPOINT}/users/${CODEWARS_USERNAME}/code-challenges/completed`)
    .then(res => res.json());

  res.send({ data, challenges });
}
