import type { NextApiRequest, NextApiResponse } from 'next'
import config from '../../devstats.config'

const USER_ID = config.stackoverflow.user_id;
const SITE_NAME = 'stackoverflow';

type Data = {
  reputation: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const username = req.query.username;
  const html = await(await fetch(`https://github.com/${username}`)).text();

  const data = await fetch(`https://api.stackexchange.com/2.2/users/${USER_ID}/reputation?site=${SITE_NAME}`)
    .then(res => res.json());

  const reputation = data.items.reduce((acc: number, el: any) => acc + el.reputation_change, 0);
  res.send({ reputation });
}
