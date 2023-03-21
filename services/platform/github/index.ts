import request from "@/services/platform/github/request";
import { QueryService } from "@/services/platform/types";

/**
 * @name getContributionsSummary
 * @title Get contributions summary
 * @requires_auth true
 * @description Get a summary of your contributions, like count of commits, PRs and issues
 */
export const getContributionsSummary: QueryService = async (
  connection,
  config
) => {
  const query = `{
    viewer{
      contributionsCollection{
        totalIssueContributions
        totalCommitContributions
        totalPullRequestContributions
      }
    }
  }`;

  const response = await request(query, connection);
  if ("error" in response) return response;
  return { success: true, data: response.data };
};

/**
 * @name getLanguageUsageSummary
 * @title Get language usage summary
 * @requires_auth true
 * @description Get a summary of your language usage in your contributions on repositories
 */
export const getLanguageUsageSummary: QueryService = async (
  connection,
  config
) => {
  const { queryConfig } = config as any;

  const query = `{ 
    viewer { 
      repositories(ownerAffiliations: [OWNER], first: 100, orderBy: {
        field: ${queryConfig.field},
        direction: ${queryConfig.direction}
      }){
        edges {
          node {
            id
            name
            languages(first: 100){
              totalCount
              totalSize
              edges {
                size
                node {
                  color
                  name
                  id
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await request(query, connection);
  if ("error" in response) return response;
  return { success: true, data: response.data };
};

/**
 * @name getRepositoryMilestone
 * @title Get repository milestone
 * @requires_auth false
 * @description Get the view of a specific milestone with count of issue and PRs for a repository
 */
export const getRepositoryMilestone: QueryService = async (
  connection,
  config
) => {
  const { queryConfig } = config as any;

  const query = `{ 
    viewer { 
      repository(name: "${queryConfig.repository_name}"){
        milestone(number: ${queryConfig.milestone_id}) {
          id
          title
          dueOn
          description
          issues {
            totalCount
          }
          pullRequests{
            totalCount
          }
          closedIssues: issues(states: [CLOSED]) {
            totalCount
          }
          closedPullRequests: pullRequests(states: [CLOSED, MERGED]){
            totalCount
          }
        }
      }
   }
  }`;

  const response = await request(query, connection);
  if ("error" in response) return response;
  return { success: true, data: response.data };
};
