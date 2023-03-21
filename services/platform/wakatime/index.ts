import { QueryService } from "@/services/platform/types";
import request from "@/services/platform/wakatime/request";

/**
 * @name getAllTimeSinceToday
 * @title Get All Time Since Today
 * @requires_auth true
 * @description Get overall time since today
 */
export const getAllTimeSinceToday: QueryService = async (
  connection,
  config
) => {
  const response = await request(
    "/users/current/all_time_since_today",
    connection.access_token as string
  );
  if ("error" in response) return response;

  return { success: true, data: response.data.data };
};
