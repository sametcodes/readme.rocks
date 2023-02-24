import config from "@config/devstats.config";
import { ServiceResponse } from "@services/platform/types";
import * as request from "@services/platform/request";

const USER_ID = config.stackoverflow.user_id;
const SITE_NAME = "stackoverflow";

export const getReputation = async (): Promise<ServiceResponse> => {
  const response = await request.stackoverflow(
    `/users/${USER_ID}/reputation?site=${SITE_NAME}`
  );
  if ("error" in response) return response;

  const reputation = response.data.items.reduce(
    (acc: number, el: any) => acc + el.reputation_change,
    0
  );

  return {
    success: true,
    data: { reputation },
    platform: "stackoverflow",
  };
};
