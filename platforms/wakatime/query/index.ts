import { QueryService } from "@/platforms/types";
import request from "@/platforms/wakatime/query/request";

/**
 * @name getAllTimeSinceToday
 * @title Get All Time Since Today
 * @query_type Private
 * @cache_time 3600
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
