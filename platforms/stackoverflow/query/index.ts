import { QueryService } from "@/platforms/types";
import request from "@/platforms/stackoverflow/query/request";

/**
 * @name getReputation
 * @title Get reputation
 * @query_type Private
 * @cache_time 3600
 * @description Get the total reputation of the user
 */
export const getReputation: QueryService = async (connection, config) => {
  const { queryConfig } = config as any;
  const params = {
    site: "stackoverflow",
    order: queryConfig.order,
    sort: queryConfig.sort,
    filter: "default",
  };

  const response = await request("/me", connection, params);
  if ("error" in response) return response;

  return {
    success: true,
    data: response,
  };
};
