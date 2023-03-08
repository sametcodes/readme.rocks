import * as Icons from "@/components/icons";
import { Pie } from "@nivo/pie";
import { PlatformQueryConfig } from "@prisma/client";
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

export const getLanguageUsageSummary = (
  result: any,
  config: PlatformQueryConfig
) => {
  const resolveLanguages = (response: any) => {
    let languages: any = {};
    let total = 0;
    response.data.viewer.repositories.edges.forEach((node: any) => {
      node.node.languages.edges.forEach((edge: any) => {
        const { id, color, name } = edge.node;
        total += edge.size;
        if (languages[name.toLowerCase()]) {
          languages[name.toLowerCase()].value += edge.size;
        } else {
          languages[name.toLowerCase()] = {
            id: name.toLowerCase(),
            label: name,
            value: edge.size,
            color,
          };
        }
      });
    });
    return Object.values(languages)
      .map((language: any) => {
        language.value = language.value / total;
        return language;
      })
      .sort((a: any, b: any) => b.value - a.value)
      .slice(0, 5);
  };
  const languages = resolveLanguages(result);

  return (
    <>
      <Pie
        innerRadius={0.8}
        enableArcLabels={false}
        arcLinkLabel={(d: any) => `${d.id} (${d.formattedValue})`}
        layers={[
          "arcs",
          "arcLabels",
          "arcLinkLabels",
          "legends",
          CenteredMetric,
        ]}
        data={languages}
        width={600}
        height={400}
        valueFormat=".0%"
        margin={{ top: 50, right: 100, bottom: 70, left: 100 }}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={{ datum: "data.color" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "square",
          },
        ]}
      />
    </>
  );
};

const CenteredMetric = ({
  dataWithArc,
  centerX,
  centerY,
}: {
  dataWithArc: any;
  centerX: number;
  centerY: number;
}) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "28px",
        fontWeight: 600,
        fontFamily: "sans-serif",
      }}
    >
      Languages
    </text>
  );
};
