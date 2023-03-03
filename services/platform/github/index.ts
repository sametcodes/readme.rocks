import { ServiceResponse } from "@services/platform/types";
import * as request from "@services/platform/request";
import { GithubUserConfig } from "@services/platform/types";

// Github GraphQL API Explorer can be used to discover
// https://docs.github.com/en/graphql/overview/explorer

/**
 * @name getCurrentYearContributions
 * @title Get current year's contributions
 * @description Get the total number of contributions for the current year
 */
export const getCurrentYearContributions = async (
  userConfig: GithubUserConfig
): Promise<ServiceResponse> => {
  const query = `{ user(login: "${userConfig.username}") {
        contributionsCollection {
          contributionCalendar { totalContributions }
        }
      }
    }`;

  const response = await request.github(query, userConfig.token);
  if ("error" in response) return response;
  return { success: true, data: response.data, platform: "github" };
};

/**
 * @name getPopularContributions
 * @title List popular contributions
 * @description List your most popular contributions overall
 */
export const getPopularContributions = async (
  userConfig: GithubUserConfig
): Promise<ServiceResponse> => {
  const query = `{ user(login: "${userConfig.username}") {
      contributionsCollection{
          popularIssueContribution{
            isRestricted
            issue { url title }
          }
          popularPullRequestContribution{
            isRestricted
            pullRequest { url title }
          }
        }
      }
    }`;

  const response = await request.github(query, userConfig.token);
  if ("error" in response) return response;
  return { success: true, data: response.data, platform: "github" };
};

/**
 * @name getContributionsSummary
 * @title Get contributions summary
 * @description Get a summary of your contributions, like count of commits, PRs and issues
 */
export const getContributionsSummary = async (
  userConfig: GithubUserConfig
): Promise<ServiceResponse> => {
  const query = `{user(login: "${userConfig.username}") {
      contributionsCollection{
        totalRepositoryContributions
        totalRepositoriesWithContributedCommits
        totalRepositoriesWithContributedPullRequests
        totalRepositoriesWithContributedIssues
      }
    }
  }`;

  const response = await request.github(query, userConfig.token);
  if ("error" in response) return response;
  return { success: true, data: response.data, platform: "github" };
};
