import {
  Progress,
  IProgress,
  Metrics,
  Flock,
  IFlock,
} from "@/lib/@dsvgui/components";
import { ViewComponent } from "@/platforms/types";
import getImageSize from "image-size";
import qs from "qs";

import { AiFillGithub, AiOutlineCalendar } from "react-icons/ai";
import { HiChartBar } from "react-icons/hi";
import { VscIssues, VscGitPullRequest } from "react-icons/vsc";
import { SiGithubsponsors } from "react-icons/si";

export const getContributionsSummary: ViewComponent = (result, config) => {
  const {
    totalCommitContributions,
    totalPullRequestContributions,
    totalIssueContributions,
  } = result.data.viewer.contributionsCollection;

  return (
    <Metrics
      icon={AiFillGithub}
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

  const completedJobsCount =
    milestone.closedPullRequests.totalCount + milestone.closedIssues.totalCount;
  const totalJobsCount =
    milestone.pullRequests.totalCount + milestone.issues.totalCount;
  const percentInText =
    Math.floor((completedJobsCount / totalJobsCount) * 100) || 0;
  const dueDate =
    (milestone.dueOn &&
      "Due by " +
        new Date(milestone.dueOn).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })) ||
    "No due date";

  const metrics: IProgress["metrics"] = [
    { icon: HiChartBar, text: `%${percentInText} completed` },
    { icon: AiOutlineCalendar, text: dueDate },
    {
      icon: VscIssues,
      text: `${milestone.closedIssues.totalCount}/${milestone.issues.totalCount} issues solved`,
    },
    {
      icon: VscGitPullRequest,
      text: `${milestone.closedPullRequests.totalCount}/${milestone.pullRequests.totalCount} PRs closed`,
    },
  ];

  return (
    <Progress
      title={milestone.title}
      percent={percentInText}
      metrics={metrics}
    />
  );
};

export const getPublicRepositoryMilestone: ViewComponent = (result, config) => {
  const { queryConfig } = config as any;

  const loginField =
    queryConfig.is_organization === "true" ? "organization" : "user";
  const { milestone } = result.data[loginField].repository;

  const completedJobsCount =
    milestone.closedPullRequests.totalCount + milestone.closedIssues.totalCount;
  const totalJobsCount =
    milestone.pullRequests.totalCount + milestone.issues.totalCount;
  const percentInText =
    Math.floor((completedJobsCount / totalJobsCount) * 100) || 0;
  const dueDate =
    (milestone.dueOn &&
      "Due by " +
        new Date(milestone.dueOn).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })) ||
    "No due date";

  const metrics: IProgress["metrics"] = [
    { icon: HiChartBar, text: `%${percentInText} completed` },
    { icon: AiOutlineCalendar, text: dueDate },
    {
      icon: VscIssues,
      text: `${milestone.closedIssues.totalCount}/${milestone.issues.totalCount} issues solved`,
    },
    {
      icon: VscGitPullRequest,
      text: `${milestone.closedPullRequests.totalCount}/${milestone.pullRequests.totalCount} PRs closed`,
    },
  ];

  return (
    <Progress
      title={milestone.title}
      percent={percentInText}
      metrics={metrics}
    />
  );
};

export const getUserActiveSponsorGoal: ViewComponent = (result, config) => {
  const { user } = result.data;

  const metrics: IProgress["metrics"] = [
    {
      icon: HiChartBar,
      text: `%${user.sponsorsListing.activeGoal.percentComplete} reached`,
    },
    {
      icon: SiGithubsponsors,
      text: `${user.sponsors.totalCount} total sponsors`,
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
      icon={AiFillGithub}
      data={[{ title: "Commit Streak", value: streak }]}
    />
  );
};

export const getContributors: ViewComponent = async (result, config) => {
  const { title, subtitle } = config.viewConfig as any;

  const contributors = result.data.repository.mentionableUsers.nodes;

  const promisedThumbnails: IFlock["members"] = contributors.map(
    async (contributor: any, key: number) => {
      const url = new URL(contributor.avatarUrl);
      const params = qs.parse(url.search, { ignoreQueryPrefix: true });
      url.search = qs.stringify({ ...params, s: "64" });

      const response = await fetch(url.toString());
      const arrayBuffer = await response.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);
      const imageData = getImageSize(buffer);

      return {
        value: buffer.toString("base64"),
        width: imageData.width,
        height: imageData.height,
      };
    }
  );

  const thumbnails = await Promise.all(promisedThumbnails);

  const members: IFlock["members"] = contributors.map(
    (contributor: any, key: number) => ({
      image: thumbnails[key],
      caption: contributor.login,
    })
  );

  return <Flock title={title} subtitle={subtitle} members={members} />;
};

export const getUserSponsorList: ViewComponent = async (result, config) => {
  const { title, subtitle } = config.viewConfig as any;

  const { nodes: sponsors } = result.data.user.sponsorshipsAsMaintainer;

  const promisedThumbnails: IFlock["members"] = sponsors.map(
    async (sponsor: any, key: number) => {
      const url = new URL(sponsor.sponsorEntity.avatarUrl);
      const params = qs.parse(url.search, { ignoreQueryPrefix: true });
      url.search = qs.stringify({ ...params, s: "64" });

      const response = await fetch(url.toString());
      const arrayBuffer = await response.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);
      const imageData = getImageSize(buffer);

      return {
        value: buffer.toString("base64"),
        width: imageData.width,
        height: imageData.height,
      };
    }
  );

  const thumbnails = await Promise.all(promisedThumbnails);

  const members: IFlock["members"] = sponsors.map(
    (sponsor: any, key: number) => ({
      image: thumbnails[key],
      caption: sponsor.sponsorEntity.login,
    })
  );

  return <Flock title={title} subtitle={subtitle} members={members} />;
};
