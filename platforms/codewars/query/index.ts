import { QueryService } from "@/platforms/types";
import request from "@/platforms/codewars/query/request";

/**
 * @name getUser
 * @title Get user details
 * @query_type Public
 * @cache_time 3600
 * @description Get a summary of your scores and top languages
 */
export const getUser: QueryService = async (connection, config) => {
  const { queryConfig } = config as any;

  const response = await request(`/users/${queryConfig.username}`);
  if ("error" in response) return response;

  const challanges = response.data;
  return { success: true, data: challanges };
};
