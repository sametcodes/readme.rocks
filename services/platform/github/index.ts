import config from '@config/devstats.config'
import { ServiceResponse } from '@services/platform/types';
import * as request from '@services/platform/request';

const GITHUB_USERNAME = config.github.username;

export const getContributions = async (): Promise<ServiceResponse> => {
    const query = `{ user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
                contributionCalendar { totalContributions }
            }
        }
    }`;

    const response = await request.github(query);
    if ("error" in response) return response;

    return { success: true, data: response.data }

}