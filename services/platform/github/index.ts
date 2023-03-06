import { ServiceResponse } from "@/services/platform/types";
import request from "@/services/platform/github/request";
import { GithubUserConfig } from "@/services/platform/types";
import { Connection } from "@prisma/client";

/**
 * @name getCurrentYearContributions
 * @title Get current year's contributions
 * @description Get the total number of contributions for the current year
 */
export const getCurrentYearContributions = async (
  connection: Connection
): Promise<ServiceResponse> => {
  const query = `{ viewer {
        contributionsCollection {
          contributionCalendar { totalContributions }
        }
      }
    }`;

  const response = await request(query, connection);
  if ("error" in response) return response;
  return { success: true, data: response.data, platform: "github" };
};

/**
 * @name getPopularContributions
 * @title List popular contributions
 * @description List your most popular contributions overall
 */
export const getPopularContributions = async (
  connection: Connection
): Promise<ServiceResponse> => {
  const query = `{ viewer {
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

  const response = await request(query, connection);
  if ("error" in response) return response;
  return { success: true, data: response.data, platform: "github" };
};

/**
 * @name getContributionsSummary
 * @title Get contributions summary
 * @description Get a summary of your contributions, like count of commits, PRs and issues
 */
export const getContributionsSummary = async (
  connection: Connection
): Promise<ServiceResponse> => {
  const query = `{viewer{
      contributionsCollection{
        totalRepositoryContributions
        totalRepositoriesWithContributedCommits
        totalRepositoriesWithContributedPullRequests
        totalRepositoriesWithContributedIssues
      }
    }
  }`;

  const response = await request(query, connection);
  if ("error" in response) return response;
  return { success: true, data: response.data, platform: "github" };
};
