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

export const getUserCommitStreak = {
  result: {
    data: {
      viewer: {
        contributionsCollection: {
          commitContributionsByRepository: [
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-04-06T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-04-05T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-04-04T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-04-03T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-04-02T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-31T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-30T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-29T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-28T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-27T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-26T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-25T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-24T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-23T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-22T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-21T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-20T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-16T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-14T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-10T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-09T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-08T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-07T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-06T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-04T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-03T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-02T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-28T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-27T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-24T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-18T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-17T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-12T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-11T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-30T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-28T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-01T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-08-29T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-27T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-17T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-16T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-12T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-11T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-09T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-03T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-26T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-25T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-22T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-20T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-19T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-12T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-11T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-09T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-08T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-06T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-05T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-04T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-30T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-29T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-28T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-27T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-25T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-24T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-23T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-21T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-20T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-19T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-16T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-15T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-14T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-13T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-09T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-03T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-02T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-29T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-28T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-26T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-24T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-22T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-21T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-16T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-07T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-05T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-01T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-28T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-26T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-25T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-24T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-20T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-19T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-18T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-16T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-14T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-13T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-01-13T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-09T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-08T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-07T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-06T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-05T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-03T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-02T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-29T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-27T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-26T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-22T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-20T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-19T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-16T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-15T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-14T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-09T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-07T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-05T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-04T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-29T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-28T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-02-23T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-20T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-11T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-10T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-07T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-04T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-03T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-01T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-31T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-30T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-29T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-28T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-27T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-25T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-24T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-22T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-20T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-19T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-18T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-17T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-16T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-03-10T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-01T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-28T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-27T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-26T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-23T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-21T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-20T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-16T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-14T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-11T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-10T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-09T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-07T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-05T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-03T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-02T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-02-01T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-31T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-12-07T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-25T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-24T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-23T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-13T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-10T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-27T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-26T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-24T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-21T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-20T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-19T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-15T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-12T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-08T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-07T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-05T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-02T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-28T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-25T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-24T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-23T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-04-06T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-04-05T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-04-04T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-04-03T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-04-02T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-31T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-30T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-21T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-18T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-17T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-14T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-13T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-12T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-02-13T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-29T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-28T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-26T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-16T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-09T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-07T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-02T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-31T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-30T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-06-14T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-12T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-11T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-10T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-27T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-22T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-21T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-20T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-19T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-12-29T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-26T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-21T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-18T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-17T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-13T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-12T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-01-23T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-22T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-19T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-18T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-10-14T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-11T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-03T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-01T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-30T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-29T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-28T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-09-27T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-01-30T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-22T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-03-21T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-03-20T07:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-11T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-07T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-05T08:00:00Z",
                  },
                  {
                    occurredAt: "2023-01-01T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-28T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-11-15T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-09T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-10-15T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-14T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-11T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-10T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-30T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-07-28T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-12-25T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-24T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-08-21T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-08-17T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-14T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-12-23T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-26T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-24T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-07T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-06T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-02T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-10-14T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-10-06T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-12-29T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-26T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-18T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-12T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-12-29T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-26T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-11T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-10T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-12-22T08:00:00Z",
                  },
                  {
                    occurredAt: "2022-12-18T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2023-01-02T08:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-08-02T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-06-05T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-02T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-27T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-04-26T07:00:00Z",
                  },
                ],
              },
            },
            {
              contributions: {
                nodes: [
                  {
                    occurredAt: "2022-05-25T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-24T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-22T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-17T07:00:00Z",
                  },
                  {
                    occurredAt: "2022-05-12T07:00:00Z",
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
};
