import { ServiceResponse } from "@services/platform/types";
import * as request from "@services/platform/request";
import { GithubUserConfig } from "@services/platform/types";

// Github GraphQL API Explorer can be used to discover
// https://docs.github.com/en/graphql/overview/explorer

export const getContributions = async (
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
