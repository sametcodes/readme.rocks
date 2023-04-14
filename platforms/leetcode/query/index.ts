import { QueryService } from "@/platforms/types";
import request from "@/platforms/leetcode/query/request";

/**
 * @name getUser
 * @title Get user
 * @query_type Public
 * @cache_time 3600
 * @description Get the user profile of a user.
 */
export const getUser: QueryService = async (connection, config) => {
  const { username } = config.queryConfig as any;

  const query = `{
        matchedUser(username: "${username}") {
            username
            profile{
                ranking
                postViewCount
                postViewCountDiff
                reputation
            }
        }
    }`;

  const response = await request(query, connection);

  return response;
};
