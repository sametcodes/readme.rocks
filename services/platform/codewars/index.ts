import config from '@config/devstats.config'
import { ServiceResponse } from '@services/platform/types';
import * as request from '@services/platform/request';

const CODEWARS_USERNAME = config.codewars.username;

export const getUser = async (): Promise<ServiceResponse> => {
    const response = await request.codewars(`/users/${CODEWARS_USERNAME}`)
    if ("error" in response) return response;

    const challanges = response.data;
    return { success: true, data: challanges }
}