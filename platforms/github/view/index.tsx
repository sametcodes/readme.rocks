import { Pie } from "@nivo/pie";
import { Progress, IProgress } from "@/lib/@dsvgui/components";

import { GithubIcon } from "@/lib/@dsvgui/icons";
import { Metrics } from "@/lib/@dsvgui/components";
import { ViewComponent } from "@/platforms/types";

export const getContributionsSummary: ViewComponent = (result, config) => {
  const {
    totalCommitContributions,
    totalPullRequestContributions,
    totalIssueContributions,
  } = result.data.viewer.contributionsCollection;

  return (
    <Metrics
      icon={GithubIcon}
      data={[
        { title: "Commits", value: totalCommitContributions },
        { title: "PRs", value: totalPullRequestContributions },
        { title: "Issues", value: totalIssueContributions },
      ]}
    />
  );
};

export const getLanguageUsageSummary: ViewComponent = (result, config) => {
  const viewConfig = config.viewConfig as any;

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

  const resolveLanguages = (response: any) => {
    const languages: any = {};
    let total = 0;
    response.data.viewer.repositories.edges.forEach((node: any) => {
      node.node.languages.edges.forEach((edge: any) => {
        const { color, name } = edge.node;
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
      .slice(0, viewConfig.first_n);
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

export const getRepositoryMilestone: ViewComponent = (result, config) => {
  const { milestone } = result.data.viewer.repository;

  const completed_jobs_count =
    milestone.closedPullRequests.totalCount + milestone.closedIssues.totalCount;
  const total_jobs_count =
    milestone.pullRequests.totalCount + milestone.issues.totalCount;
  const percent_in_text =
    Math.floor((completed_jobs_count / total_jobs_count) * 100) || 0;
  const dueDate =
    (milestone.dueOn &&
      "Due by" +
        new Date(milestone.dueOn).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })) ||
    "No due date";

  const Icons = {
    Pie: (
      <path
        className="icon"
        fill="#555"
        transform="translate(0 -16) scale(1.2)"
        d="M8 1.3C4.3 1.3 1.3 4.3 1.3 8s3 6.7 6.7 6.7 6.7-3 6.7-6.7S11.7 1.3 8 1.3z m0 6.7V3.3c2.7 0 4.7 2 4.7 4.7h-4.7z"
      />
    ),
    PR: (
      <path
        className="icon"
        fill="#555"
        transform="translate(0 -16) scale(1.2)"
        d="M12.7 10.1V5.3C12.7 4.3 12 2.7 10 2.7V1.3l-2.7 2 2.7 2V4c1.2 0 1.3 1 1.3 1.3v4.8c-1 0.3-1.7 1.2-1.6 2.2 0 1.3 1 2.3 2.3 2.4s2.3-1 2.3-2.4c0-1.1-0.7-1.9-1.6-2.2z m-0.7 3.2c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1-0.4 1-1 1zM6.3 3.7C6.3 2.4 5.3 1.3 4 1.3S1.7 2.4 1.7 3.7c0 1.1 0.7 1.9 1.6 2.2v4.2c-1 0.3-1.7 1.2-1.6 2.2C1.7 13.6 2.7 14.7 4 14.7s2.3-1 2.3-2.4c0-1.1-0.7-1.9-1.6-2.2V5.9C5.6 5.6 6.3 4.7 6.3 3.7z m-3.3 0C3 3.1 3.4 2.7 4 2.7s1 0.4 1 1S4.6 4.7 4 4.7s-1-0.4-1-1z m2 8.6c0 0.6-0.4 1-1 1s-1-0.4-1-1S3.4 11.3 4 11.3s1 0.4 1 1z"
      />
    ),
    Issue: (
      <g>
        <path
          className="icon"
          fill="#555"
          transform="translate(0 -16) scale(1.1)"
          d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        ></path>
        <path
          className="icon"
          fill="#555"
          transform="translate(0 -16) scale(1.1)"
          d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"
        ></path>
      </g>
    ),
    Calendar: (
      <path
        className="icon"
        fill="#555"
        transform="translate(0 -16) scale(1.2)"
        d="M12.7 14.7H3.3C2.6 14.7 2 14.1 2 13.3V4C2 3.3 2.6 2.7 3.3 2.7H4.7V1.3H6V2.7H10V1.3H11.3V2.7H12.7C13.4 2.7 14 3.3 14 4V13.3C14 14.1 13.4 14.7 12.7 14.7ZM3.3 6.7V13.3H12.7V6.7H3.3ZM3.3 4V5.3H12.7V4H3.3Z"
      />
    ),
  };

  const metrics: IProgress["metrics"] = [
    {
      text: `%${percent_in_text} completed`,
      icon: Icons.Pie,
    },
    {
      text: dueDate,
      icon: Icons.Calendar,
    },
    {
      text: `${milestone.closedIssues.totalCount}/${milestone.issues.totalCount} issues solved`,
      icon: Icons.Issue,
    },
    {
      text: `${milestone.closedPullRequests.totalCount}/${milestone.pullRequests.totalCount} PRs closed`,
      icon: Icons.PR,
    },
  ];

  return (
    <Progress
      title={milestone.title}
      percent={percent_in_text}
      metrics={metrics}
    />
  );
};

export const getPublicRepositoryMilestone: ViewComponent = (result, config) => {
  const { milestone } =
    (config.queryConfig as any).is_organization === "true"
      ? result.data.organization.repository
      : result.data.user.repository;

  const completed_jobs_count =
    milestone.closedPullRequests.totalCount + milestone.closedIssues.totalCount;
  const total_jobs_count =
    milestone.pullRequests.totalCount + milestone.issues.totalCount;
  const percent_in_text =
    Math.floor((completed_jobs_count / total_jobs_count) * 100) || 0;
  const dueDate =
    (milestone.dueOn &&
      "Due by" +
        new Date(milestone.dueOn).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })) ||
    "No due date";

  const Icons = {
    Pie: (
      <path
        className="icon"
        fill="#555"
        transform="translate(0 -16) scale(1.2)"
        d="M8 1.3C4.3 1.3 1.3 4.3 1.3 8s3 6.7 6.7 6.7 6.7-3 6.7-6.7S11.7 1.3 8 1.3z m0 6.7V3.3c2.7 0 4.7 2 4.7 4.7h-4.7z"
      />
    ),
    PR: (
      <path
        className="icon"
        fill="#555"
        transform="translate(0 -16) scale(1.2)"
        d="M12.7 10.1V5.3C12.7 4.3 12 2.7 10 2.7V1.3l-2.7 2 2.7 2V4c1.2 0 1.3 1 1.3 1.3v4.8c-1 0.3-1.7 1.2-1.6 2.2 0 1.3 1 2.3 2.3 2.4s2.3-1 2.3-2.4c0-1.1-0.7-1.9-1.6-2.2z m-0.7 3.2c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1-0.4 1-1 1zM6.3 3.7C6.3 2.4 5.3 1.3 4 1.3S1.7 2.4 1.7 3.7c0 1.1 0.7 1.9 1.6 2.2v4.2c-1 0.3-1.7 1.2-1.6 2.2C1.7 13.6 2.7 14.7 4 14.7s2.3-1 2.3-2.4c0-1.1-0.7-1.9-1.6-2.2V5.9C5.6 5.6 6.3 4.7 6.3 3.7z m-3.3 0C3 3.1 3.4 2.7 4 2.7s1 0.4 1 1S4.6 4.7 4 4.7s-1-0.4-1-1z m2 8.6c0 0.6-0.4 1-1 1s-1-0.4-1-1S3.4 11.3 4 11.3s1 0.4 1 1z"
      />
    ),
    Issue: (
      <g>
        <path
          className="icon"
          fill="#555"
          transform="translate(0 -16) scale(1.1)"
          d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        ></path>
        <path
          className="icon"
          fill="#555"
          transform="translate(0 -16) scale(1.1)"
          d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"
        ></path>
      </g>
    ),
    Calendar: (
      <path
        className="icon"
        fill="#555"
        transform="translate(0 -16) scale(1.2)"
        d="M12.7 14.7H3.3C2.6 14.7 2 14.1 2 13.3V4C2 3.3 2.6 2.7 3.3 2.7H4.7V1.3H6V2.7H10V1.3H11.3V2.7H12.7C13.4 2.7 14 3.3 14 4V13.3C14 14.1 13.4 14.7 12.7 14.7ZM3.3 6.7V13.3H12.7V6.7H3.3ZM3.3 4V5.3H12.7V4H3.3Z"
      />
    ),
  };

  const metrics: IProgress["metrics"] = [
    {
      text: `%${percent_in_text} completed`,
      icon: Icons.Pie,
    },
    {
      text: dueDate,
      icon: Icons.Calendar,
    },
    {
      text: `${milestone.closedIssues.totalCount}/${milestone.issues.totalCount} issues solved`,
      icon: Icons.Issue,
    },
    {
      text: `${milestone.closedPullRequests.totalCount}/${milestone.pullRequests.totalCount} PRs closed`,
      icon: Icons.PR,
    },
  ];

  return (
    <Progress
      title={milestone.title}
      percent={percent_in_text}
      metrics={metrics}
    />
  );
};
