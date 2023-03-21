import { Pie } from "@nivo/pie";

import { GithubIcon } from "@/components/@dsvgui/icons";
import { Bars } from "@/components/@dsvgui/components";
import { Style as SVGStyle } from "@/components/@dsvgui/document";
import { ViewComponent } from "@/platforms/types";

export const getContributionsSummary: ViewComponent = (result, config) => {
  const {
    totalCommitContributions,
    totalPullRequestContributions,
    totalIssueContributions,
  } = result.data.viewer.contributionsCollection;

  return (
    <Bars
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

  const total = 462;
  const completed_jobs_count =
    milestone.closedPullRequests.totalCount + milestone.closedIssues.totalCount;
  const total_jobs_count =
    milestone.pullRequests.totalCount + milestone.issues.totalCount;
  const percent_in_bar = Math.floor(
    (completed_jobs_count / total_jobs_count) * total
  );
  const percent_in_text = Math.floor(
    (completed_jobs_count / total_jobs_count) * 100
  );
  const dueDate = new Date(milestone.dueOn).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="497"
      height="165"
      viewBox="0 0 497 165"
      fill="none"
    >
      <SVGStyle />
      <style>{`text{ font-weight: 300 }`}</style>
      <path
        d="M249.354 133.25C249.354 132.838 249.456 132.433 249.65 132.081C249.843 131.728 250.12 131.442 250.451 131.252C250.782 131.063 251.153 130.978 251.524 131.006C251.895 131.035 252.252 131.176 252.556 131.414C252.86 131.652 253.099 131.978 253.247 132.357C253.395 132.735 253.446 133.151 253.395 133.56C253.344 133.969 253.192 134.354 252.957 134.673C252.722 134.993 252.412 135.235 252.061 135.372V140.628C252.512 140.805 252.893 141.153 253.136 141.611C253.378 142.069 253.467 142.607 253.386 143.131C253.305 143.654 253.059 144.129 252.693 144.471C252.327 144.814 251.863 145.001 251.384 145.001C250.905 145.001 250.441 144.814 250.075 144.471C249.708 144.129 249.463 143.654 249.382 143.131C249.301 142.607 249.389 142.069 249.632 141.611C249.874 141.153 250.255 140.805 250.707 140.628V135.372C250.311 135.217 249.968 134.93 249.726 134.549C249.484 134.169 249.353 133.715 249.354 133.25ZM254.476 133.073L256.638 130.677C256.67 130.642 256.71 130.618 256.754 130.608C256.798 130.599 256.843 130.604 256.884 130.623C256.926 130.642 256.961 130.674 256.986 130.715C257.01 130.756 257.024 130.805 257.023 130.854V132.5H257.926C258.524 132.5 259.098 132.763 259.521 133.232C259.944 133.701 260.182 134.337 260.182 135V140.628C260.633 140.805 261.014 141.153 261.257 141.611C261.499 142.069 261.588 142.607 261.507 143.131C261.426 143.654 261.181 144.129 260.814 144.471C260.448 144.814 259.984 145.001 259.505 145.001C259.026 145.001 258.562 144.814 258.196 144.471C257.829 144.129 257.584 143.654 257.503 143.131C257.422 142.607 257.511 142.069 257.753 141.611C257.996 141.153 258.376 140.805 258.828 140.628V135C258.828 134.735 258.733 134.48 258.564 134.293C258.395 134.105 258.165 134 257.926 134H257.023V135.646C257.024 135.696 257.01 135.744 256.986 135.785C256.961 135.826 256.926 135.858 256.884 135.877C256.843 135.896 256.798 135.901 256.754 135.892C256.71 135.882 256.67 135.858 256.638 135.823L254.476 133.427C254.455 133.404 254.438 133.376 254.427 133.346C254.416 133.315 254.41 133.283 254.41 133.25C254.41 133.217 254.416 133.185 254.427 133.154C254.438 133.124 254.455 133.096 254.476 133.073ZM251.384 132.5C251.204 132.5 251.032 132.579 250.905 132.72C250.778 132.86 250.707 133.051 250.707 133.25C250.707 133.449 250.778 133.64 250.905 133.78C251.032 133.921 251.204 134 251.384 134C251.563 134 251.735 133.921 251.862 133.78C251.989 133.64 252.061 133.449 252.061 133.25C252.061 133.051 251.989 132.86 251.862 132.72C251.735 132.579 251.563 132.5 251.384 132.5ZM251.384 142C251.204 142 251.032 142.079 250.905 142.22C250.778 142.36 250.707 142.551 250.707 142.75C250.707 142.949 250.778 143.14 250.905 143.28C251.032 143.421 251.204 143.5 251.384 143.5C251.563 143.5 251.735 143.421 251.862 143.28C251.989 143.14 252.061 142.949 252.061 142.75C252.061 142.551 251.989 142.36 251.862 142.22C251.735 142.079 251.563 142 251.384 142ZM258.828 142.75C258.828 142.949 258.899 143.14 259.026 143.28C259.153 143.421 259.325 143.5 259.505 143.5C259.684 143.5 259.857 143.421 259.983 143.28C260.11 143.14 260.182 142.949 260.182 142.75C260.182 142.551 260.11 142.36 259.983 142.22C259.857 142.079 259.684 142 259.505 142C259.325 142 259.153 142.079 259.026 142.22C258.899 142.36 258.828 142.551 258.828 142.75Z"
        fill="#636363"
      />
      <text fill="#636363">
        <tspan x="271.461" y="144" fontSize={17}>
          <tspan fontWeight={500}>
            {milestone.closedPullRequests.totalCount}/
            {milestone.pullRequests.totalCount}
          </tspan>{" "}
          PRs closed
        </tspan>
      </text>
      <g clip-path="url(#clip0_114_277)">
        <path
          d="M24.25 139.5C24.6105 139.5 24.9563 139.342 25.2112 139.061C25.4662 138.779 25.6094 138.398 25.6094 138C25.6094 137.602 25.4662 137.221 25.2112 136.939C24.9563 136.658 24.6105 136.5 24.25 136.5C23.8895 136.5 23.5437 136.658 23.2888 136.939C23.0338 137.221 22.8906 137.602 22.8906 138C22.8906 138.398 23.0338 138.779 23.2888 139.061C23.5437 139.342 23.8895 139.5 24.25 139.5Z"
          fill="#636363"
        />
        <path
          d="M24.25 130C26.1728 130 28.0169 130.843 29.3765 132.343C30.7362 133.843 31.5 135.878 31.5 138C31.5 140.122 30.7362 142.157 29.3765 143.657C28.0169 145.157 26.1728 146 24.25 146C22.3272 146 20.4831 145.157 19.1235 143.657C17.7638 142.157 17 140.122 17 138C17 135.878 17.7638 133.843 19.1235 132.343C20.4831 130.843 22.3272 130 24.25 130ZM18.3594 138C18.3594 139.724 18.98 141.377 20.0847 142.596C21.1894 143.815 22.6877 144.5 24.25 144.5C25.8123 144.5 27.3106 143.815 28.4153 142.596C29.52 141.377 30.1406 139.724 30.1406 138C30.1406 136.276 29.52 134.623 28.4153 133.404C27.3106 132.185 25.8123 131.5 24.25 131.5C22.6877 131.5 21.1894 132.185 20.0847 133.404C18.98 134.623 18.3594 136.276 18.3594 138Z"
          fill="#636363"
        />
      </g>
      <text fill="#636363" fontFamily="Roboto">
        <tspan x="40.5625" y="144" fontSize={17}>
          <tspan fontWeight={500}>
            {milestone.closedIssues.totalCount}/{milestone.issues.totalCount}
          </tspan>{" "}
          issues solved
        </tspan>
      </text>
      <path
        d="M253.268 103C253.446 103 253.618 103.079 253.744 103.22C253.87 103.36 253.941 103.551 253.941 103.75V105H258.434V103.75C258.434 103.551 258.505 103.36 258.631 103.22C258.757 103.079 258.929 103 259.107 103C259.286 103 259.458 103.079 259.584 103.22C259.71 103.36 259.781 103.551 259.781 103.75V105H260.904C261.772 105 262.477 105.784 262.477 106.75V117.25C262.477 117.714 262.311 118.159 262.016 118.487C261.721 118.816 261.321 119 260.904 119H251.471C251.054 119 250.654 118.816 250.359 118.487C250.064 118.159 249.898 117.714 249.898 117.25V106.75C249.898 105.784 250.603 105 251.471 105H252.594V103.75C252.594 103.551 252.665 103.36 252.791 103.22C252.917 103.079 253.089 103 253.268 103ZM251.246 110.5V117.25C251.246 117.388 251.347 117.5 251.471 117.5H260.904C260.964 117.5 261.021 117.474 261.063 117.427C261.105 117.38 261.129 117.316 261.129 117.25V110.5H251.246ZM260.904 106.5H251.471C251.411 106.5 251.354 106.526 251.312 106.573C251.27 106.62 251.246 106.684 251.246 106.75V109H261.129V106.75C261.129 106.684 261.105 106.62 261.063 106.573C261.021 106.526 260.964 106.5 260.904 106.5Z"
        fill="#636363"
      />
      <text fill="#636363">
        <tspan x="272.359" y="117" fontSize={17}>
          Due by <tspan fontWeight={500}>{dueDate}</tspan>
        </tspan>
      </text>
      <g clip-path="url(#clip1_114_277)">
        <path
          d="M25 104C23.6155 104 22.2622 104.411 21.111 105.18C19.9599 105.949 19.0627 107.042 18.5328 108.321C18.003 109.6 17.8644 111.008 18.1345 112.366C18.4046 113.723 19.0713 114.971 20.0503 115.95C21.0292 116.929 22.2765 117.595 23.6344 117.865C24.9922 118.136 26.3997 117.997 27.6788 117.467C28.9579 116.937 30.0511 116.04 30.8203 114.889C31.5895 113.738 32 112.384 32 111C32 109.143 31.2625 107.363 29.9498 106.05C28.637 104.737 26.8565 104 25 104ZM25 117C23.4087 117 21.8826 116.368 20.7574 115.243C19.6321 114.117 19 112.591 19 111C19 109.409 19.6321 107.883 20.7574 106.757C21.8826 105.632 23.4087 105 25 105V111L29.2667 115.267C28.7047 115.822 28.0385 116.262 27.3063 116.559C26.5741 116.856 25.7903 117.006 25 117Z"
          fill="#636363"
          stroke="#636363"
        />
      </g>
      <text fill="#636363">
        <tspan x="43" y="117" fontSize={17}>
          %<tspan fontWeight={500}>{percent_in_text}</tspan> complete
        </tspan>
      </text>
      <g>
        <rect x="17" y="64" width={total} height="18" rx="5" fill="#E7E7E7" />
        <rect
          x="17"
          y="64"
          width={percent_in_bar}
          height="18"
          rx="5"
          fill="#2DA44E"
        />
      </g>
      <text fill="#5E5E5E">
        <tspan x="17" y="40.7539" fontWeight={700} fontSize={25}>
          {milestone.title}
        </tspan>
      </text>
      <defs>
        <clipPath id="clip0_114_277">
          <rect
            width="14.5"
            height="16"
            fill="white"
            transform="translate(17 130)"
          />
        </clipPath>
        <clipPath id="clip1_114_277">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(17 103)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
