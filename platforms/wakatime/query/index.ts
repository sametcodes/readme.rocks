import { QueryService } from "@/platforms/types";
import request from "@/platforms/wakatime/query/request";
import { objectToQueryString } from "../../../utils/index";

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
    connection
  );
  return response;
};

/**
 * @name getTimeWithRange
 * @title Get Time With Range
 * @query_type Private
 * @cache_time 60
 * @description Get your wakatime time stats with a specific date range.
 */
export const getTimeWithRange: QueryService = async (connection, config) => {
  const { range } = config.queryConfig as any;
  const query_string = objectToQueryString({ range });
  const response = await request(
    `/users/current/summaries?${query_string}`,
    connection
  );
  return response;
};
