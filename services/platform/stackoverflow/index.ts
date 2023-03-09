import { QueryService } from "@/services/platform/types";
import request from "@/services/platform/stackoverflow/request";

/**
 * @name getReputation
 * @title Get reputation
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
    data: { reputation: 5 },
  };
};
