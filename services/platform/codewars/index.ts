import { QueryService } from "@/services/platform/types";
import request from "@/services/platform/codewars/request";

/**
 * @name getUser
 * @title Get user details
 * @description Get a summary of your scores and top languages
 */
export const getUser: QueryService = async (connection, config) => {
  const { queryConfig } = config as any;

  const response = await request(`/users/${queryConfig.username}`);
  if ("error" in response) return response;

  const challanges = response.data;
  return { success: true, data: challanges };
};
