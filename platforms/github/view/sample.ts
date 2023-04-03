export const getContributionsSummary = {
  result: {
    data: {
      viewer: {
        contributionsCollection: {
          totalCommitContributions: 1253,
          totalIssueContributions: 85,
          totalPullRequestContributions: 56,
        },
      },
    },
  },
};

export const getRepositoryMilestone = {
  result: {
    data: {
      viewer: {
        repository: {
          milestone: {
            title: "Version v5.3.1",
            issues: {
              totalCount: 14,
            },
            closedIssues: {
              totalCount: 7,
            },
            pullRequests: {
              totalCount: 28,
            },
            closedPullRequests: {
              totalCount: 14,
            },
          },
        },
      },
    },
  },
};

export const getPublicRepositoryMilestone = {
  result: {
    data: {
      organization: {
        repository: {
          milestone: {
            title: "Version v5.3.1",
            issues: {
              totalCount: 14,
            },
            closedIssues: {
              totalCount: 7,
            },
            pullRequests: {
              totalCount: 28,
            },
            closedPullRequests: {
              totalCount: 14,
            },
          },
        },
      },
    },
  },
  config: { queryConfig: { is_organization: "true" } },
};

export const getUserActiveSponsorGoal = {
  result: {
    data: {
      user: {
        sponsorsListing: {
          activeGoal: {
            title: "Sponsorship Goal",
            percentComplete: 54,
          },
        },
        sponsors: {
          totalCount: 18,
        },
      },
    },
  },
};
