import { ViewComponent } from "@/platforms/types";
import { Metrics } from "@/lib/@dsvgui";
import { LeetcodeIcon } from "@/lib/@dsvgui/icons";

export const getUser: ViewComponent = (result, config) => {
  const user = result.data.matchedUser;
  return (
    <Metrics
      icon={LeetcodeIcon}
      data={[
        { title: "Reputation", value: user.profile.reputation },
        { title: "Ranking", value: user.profile.ranking },
        { title: "Post view count", value: user.profile.postViewCount },
      ]}
    />
  );
};
