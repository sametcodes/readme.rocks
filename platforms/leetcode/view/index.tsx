import { ViewComponent } from "@/platforms/types";
import { Metrics, Calendar } from "@/lib/@dsvgui";
import { SiLeetcode } from "react-icons/si";

export const getUser: ViewComponent = (result, config) => {
  const user = result.data.matchedUser;
  return (
    <Metrics
      icon={SiLeetcode}
      data={[
        { title: "Reputation", value: user.profile.reputation },
        { title: "Ranking", value: user.profile.ranking },
        { title: "Post view count", value: user.profile.postViewCount },
      ]}
    />
  );
};

export const getUserSubmissions: ViewComponent = (result, config) => {
  const viewConfig = config.viewConfig as any;
  const user = result.data.matchedUser;

  const dates = Object.entries(
    JSON.parse(user.userCalendar.submissionCalendar)
  ).reduce((acc: { [key: string]: number }, [key, value]) => {
    const date = new Date(Number(key) * 1000).toISOString().split("T")[0];
    acc[date] = Number(value);
    return acc;
  }, {});

  return (
    <Calendar
      title={viewConfig?.title}
      subtitle={viewConfig?.subtitle}
      weekCount={viewConfig?.weekCount}
      dates={dates}
    />
  );
};
