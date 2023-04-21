import { Metrics, Calendar } from "@/lib/@dsvgui/components";
import { ViewComponent } from "@/platforms/types";
import { FaHackerNewsSquare } from "react-icons/fa";

export const getUser: ViewComponent = (result, config) => {
  const { user } = result.data;

  return (
    <Metrics
      icon={FaHackerNewsSquare}
      data={[{ title: "Karma", value: user.karma }]}
    />
  );
};

export const getUserSubmissions: ViewComponent = (result, config) => {
  const viewConfig = config.viewConfig as any;
  const submissions = result.data.user.submissions;

  const dates = submissions.reduce(
    (acc: { [key: string]: number }, value: any) => {
      const date = value.createdAt.split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <Calendar
      title={viewConfig?.title}
      subtitle={viewConfig?.subtitle}
      weekCount={viewConfig?.weekCount}
      dates={dates}
      boxColor={viewConfig?.boxColor}
      showMonthLabels={viewConfig?.showMonthLabels === "true"}
      showStreak={viewConfig?.showStreak === "true"}
    />
  );
};
