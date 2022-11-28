import config from '../../devstats.config'

const GITHUB_USERNAME = config.github.username;
const GITHUB_PAT = config.github.token;

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${GITHUB_PAT}`,
      "Accept": "application/vnd.github.v4.idl",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }`,
    })
  }).then(res => res.json());

  res.send(data);
}
