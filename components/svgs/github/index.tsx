import * as Icons from "@/components/icons";
import {
  Document,
  DocumentTitle,
  List,
  ListItem,
} from "@/components/svgs/document";

export const getCurrentYearContributions = (result: any, platform: any) => {
  const { totalContributions } =
    result.data.viewer.contributionsCollection.contributionCalendar;

  return (
    <Document width={305} height={100}>
      <DocumentTitle>Github</DocumentTitle>
      <List>
        <ListItem
          icon={<Icons.PullRequestIcon />}
          text="Contibutions in this year:"
          value={totalContributions}
        />
      </List>
    </Document>
  );
};

export const getPopularContributions = (result: any) => {
  const popularContributions = result.data.viewer.contributionsCollection;
  const [popularIssue, popularPullrequest] = [
    popularContributions.popularIssueContribution.issue,
    popularContributions.popularPullRequestContribution.pullRequest,
  ];

  return (
    <Document width={560} height={115}>
      <DocumentTitle>Github</DocumentTitle>
      <List>
        <ListItem
          icon={<Icons.IssueIcon />}
          text="The most popular issue:"
          value={popularIssue.title}
          url={popularIssue.url}
        />
        <ListItem
          icon={<Icons.PullRequestIcon />}
          text="The most popular PR:"
          value={popularPullrequest.title}
          url={popularPullrequest.url}
        />
      </List>
    </Document>
  );
};

export const getContributionsSummary = (result: any) => {
  const {
    totalRepositoryContributions,
    totalRepositoriesWithContributedCommits,
    totalRepositoriesWithContributedPullRequests,
    totalRepositoriesWithContributedIssues,
  } = result.data.viewer.contributionsCollection;

  return (
    <Document width={410} height={170}>
      <DocumentTitle>Github</DocumentTitle>
      <List>
        <ListItem
          icon={<Icons.RepositoryIcon />}
          text="Total repository contributions:"
          value={totalRepositoryContributions}
        />
        <ListItem
          icon={<Icons.CommitIcon />}
          text="Total repositories with contributed commits:"
          value={totalRepositoriesWithContributedCommits}
        />
        <ListItem
          icon={<Icons.PullRequestIcon />}
          text="Total repositories with contributed PRs:"
          value={totalRepositoriesWithContributedPullRequests}
        />
        <ListItem
          icon={<Icons.IssueIcon />}
          text="Total repositories with contributed issues:"
          value={totalRepositoriesWithContributedIssues}
        />
      </List>
    </Document>
  );
};
