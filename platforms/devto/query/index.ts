import { QueryService } from "@/platforms/types";
import request from "@/platforms/devto/query/request";
import { objectToQueryString } from "../../../utils/index";

/**
 * @name listArticles
 * @title List articles
 * @query_type Public
 * @description List the articles of a user, sorted by most recent or popular.
 */
export const listArticles: QueryService = async (connection, config) => {
  const { queryConfig } = config as any;

  const queryString = objectToQueryString({
    per_page: queryConfig.count || 5,
    username: queryConfig.username,
  });

  const response = await request(`/api/articles?${queryString}`);
  if ("error" in response) return response;

  return { success: true, data: response };
};
