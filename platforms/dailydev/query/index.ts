import { QueryService } from "@/platforms/types";
import request from "@/platforms/dailydev/query/request";

/**
 * @name listArticles
 * @title List articles
 * @query_type Public
 * @cache_time 3600
 * @description List the articles of a user, sorted by most recent or popular.
 */
export const listArticles: QueryService = async (connection, config) => {
  const { queryConfig } = config as any;

  const query = `query SourceFeed {
    page: sourceFeed(
      source: "${queryConfig.username}"
      first: ${queryConfig.count}
      ranking: TIME
      supportedTypes: ["article"]
    ) {
      edges {
        node {
          id
          title
          description
          createdAt
          image
          readTime
          permalink
          numComments
          numUpvotes
          commentsPermalink
          trending
          source{
              image
              name
              handle
          }
          tags
          type
          private
        }
      }
    }
  }`;

  const response = await request(query, connection);
  return response;
};
