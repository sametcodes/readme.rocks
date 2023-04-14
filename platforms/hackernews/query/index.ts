import { QueryService } from "@/platforms/types";
import request from "@/platforms/github/query/request";

/**
 * @name getUser
 * @title Get user details
 * @query_type Public
 * @cache_time 3600
 * @description Get the details of a specific user.
 */
export const getUser: QueryService = async (connection, config) => {
  const { queryConfig } = config as any;
  const { username } = queryConfig as { username: string };

  const query = `{
    user(username: "${username}"){
      username
      karma
      about
    }
  }`;

  const response = await request(query, connection);
  return response;
};
