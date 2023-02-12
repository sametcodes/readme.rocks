import config from '@config/devstats.config'
import { ServiceResponse } from '@services/platform/types';
import * as request from '@services/platform/request';

const GITHUB_USERNAME = config.github.username;

// Github GraphQL API Explorer can be used to discover
// https://docs.github.com/en/graphql/overview/explorer

export const getContributions = async (): Promise<ServiceResponse> => {
    const query = `{ user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar { totalContributions }
        }
      }
    }`;

    const response = await request.github(query);
    if ("error" in response) return response;
    return { success: true, data: response.data }
}

export const getPopularContributions = async (): Promise<ServiceResponse> => {
    const query = `{ user(login: "${GITHUB_USERNAME}") {
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

    const response = await request.github(query);
    if ("error" in response) return response;
    return { success: true, data: response.data }
}

export const getContributionsSummary = async (): Promise<ServiceResponse> => {
    const query = `{user(login: "${GITHUB_USERNAME}") {
      contributionsCollection{
        totalRepositoryContributions
        totalRepositoriesWithContributedCommits
        totalRepositoriesWithContributedPullRequests
        totalRepositoriesWithContributedIssues
      }
    }
  }`;

    const response = await request.github(query);
    if ("error" in response) return response;
    return { success: true, data: response.data }
}