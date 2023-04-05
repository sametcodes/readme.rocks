import request from "@/platforms/github/query/request";
import { QueryService } from "@/platforms/types";

/**
 * @name getContributionsSummary
 * @title Get contributions summary
 * @query_type Private
 * @cache_time 3600
 * @description Get a summary of your contributions, like count of commits, PRs and issues
 */
export const getContributionsSummary: QueryService = async (
  connection,
  config,
  secured
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

  return response;
};

/**
 * @name getRepositoryMilestone
 * @title Get repository milestone
 * @query_type Private
 * @cache_time 60
 * @for_public getPublicRepositoryMilestone
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

  return response;
};

/**
 * @name getPublicRepositoryMilestone
 * @title Get public repository milestone
 * @query_type Public
 * @cache_time 60
 * @for_secured getRepositoryMilestone
 * @description Get the view of a specific milestone with count of issue and PRs for a repository
 */
export const getPublicRepositoryMilestone: QueryService = async (
  connection,
  config
) => {
  const { queryConfig } = config as any;

  console.log(queryConfig);
  const login_field =
    queryConfig.is_organization === "true" ? "organization" : "user";
  const query = `{
    ${login_field}(login: "${queryConfig.owner_name}"){
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

  const { milestone } = response.data[login_field].repository;
  if (!milestone)
    throw new Error(
      "The milestone you are looking for does not exist. Please check the provided parameters."
    );

  return response;
};

/**
 * @name getUserActiveSponsorGoal
 * @title Get active sponsor goal
 * @query_type Public
 * @cache_time 3600
 * @description Show your active sponsor goal
 */
export const getUserActiveSponsorGoal: QueryService = async (
  connection,
  config
) => {
  const { username } = config.queryConfig as any;
  const query = `{ 
    user(login: "${username}"){
      id
      hasSponsorsListing
      estimatedNextSponsorsPayoutInCents
      monthlyEstimatedSponsorsIncomeInCents
      sponsors{
        totalCount
      }
      sponsorsListing {
        id
        name
        shortDescription
        activeGoal {
          title
          percentComplete
          targetValue
          description
        }
      }
    }
  }`;

  const response = await request(query, connection);
  if (!response.data.user.sponsorsListing) {
    throw new Error("This user is not a GitHub Sponsors member.");
  }
  if (!response.data.user.sponsorsListing.activeGoal)
    throw new Error(
      "This user has no active sponsor goal, or the user is not a GitHub Sponsors member."
    );

  return response;
};
