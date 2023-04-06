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
      "Due by " +
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
  const { queryConfig } = config as any;

  const login_field =
    queryConfig.is_organization === "true" ? "organization" : "user";
  const { milestone } = result.data[login_field].repository;

  const completed_jobs_count =
    milestone.closedPullRequests.totalCount + milestone.closedIssues.totalCount;
  const total_jobs_count =
    milestone.pullRequests.totalCount + milestone.issues.totalCount;
  const percent_in_text =
    Math.floor((completed_jobs_count / total_jobs_count) * 100) || 0;
  const dueDate =
    (milestone.dueOn &&
      "Due by " +
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

export const getUserActiveSponsorGoal: ViewComponent = (result, config) => {
  const { user } = result.data;

  const Icons = {
    TargetArrow: (
      <path
        className="icon"
        fill="#555"
        transform="translate(0 -18)"
        d="M21.6 6.4a0.6 0.6 0 0 1-0.2 0.6l-2.4 2.4A0.6 0.6 0 0 1 18.6 9.6h-3.4l-1.6 1.6a1.8 1.8 0 1 1-0.8-0.8L14.4 8.8V5.4a0.6 0.6 0 0 1 0.2-0.4l2.4-2.4A0.6 0.6 0 0 1 18 3V6h3a0.6 0.6 0 0 1 0.6 0.4ZM19.6 7.2H17.4a0.6 0.6 0 0 1-0.6-0.6V4.4l-1.2 1.2V8.4h2.8l1.2-1.2Zm1.5 1.8C21.4 10 21.6 11 21.6 12a9.6 9.6 0 1 1-6.6-9.1l-1 0.9a8.4 8.4 0 1 0 6.2 6.2l0.9-1ZM17.9 10.8A6 6 0 1 1 13.2 6.1v1.3A4.8 4.8 0 1 0 16.6 10.8H17.9Z"
      />
    ),
    Sponsors: (
      <g>
        <path
          className="icon"
          fill="#555"
          transform="translate(0 -16) scale(1.2)"
          d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7z m4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        />
        <path
          className="icon"
          fill="#555"
          transform="translate(0 -16) scale(1.2)"
          d="M5.2 14A2.2 2.2 0 0 1 5 13c0-1.4 0.7-2.8 1.9-3.7A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.2z"
        />
        <path
          className="icon"
          fill="#555"
          transform="translate(0 -16) scale(1.2)"
          d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
        />
      </g>
    ),
  };

  const metrics: IProgress["metrics"] = [
    {
      text: `%${user.sponsorsListing.activeGoal.percentComplete} reached`,
      icon: Icons.TargetArrow,
    },
    {
      text: `${user.sponsors.totalCount} total sponsors`,
      icon: Icons.Sponsors,
    },
  ];

  return (
    <Progress
      title={user.sponsorsListing.activeGoal.title}
      percent={user.sponsorsListing.activeGoal.percentComplete}
      metrics={metrics}
    />
  );
};

export const getUserCommitStreak: ViewComponent = (result, config) => {
  const dates = new Set<string>();

  result.data.viewer.contributionsCollection.commitContributionsByRepository.forEach(
    (repo: any) => {
      repo.contributions.nodes.forEach((commit: any) => {
        const date = new Date(commit.occurredAt).toISOString().split("T")[0];
        dates.add(date);
      });
    }
  );

  const sortedDates = Array.from(dates).sort();
  let streak = 0;
  let currentStreak = 0;

  for (let i = 1; i < sortedDates.length; i++) {
    const previousDate = new Date(sortedDates[i - 1]);
    const currentDate = new Date(sortedDates[i]);
    const dayDifference =
      (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);

    if (dayDifference === 1) {
      currentStreak++;
    } else {
      currentStreak = 0;
    }

    streak = Math.max(streak, currentStreak);
  }

  return (
    <Metrics
      icon={GithubIcon}
      data={[{ title: "Commit Streak", value: streak }]}
    />
  );
};
