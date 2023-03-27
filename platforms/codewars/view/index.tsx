import { ViewComponent } from "@/platforms/types";
import { Metrics } from "@/lib/@dsvgui";
import { CodewarsIcon } from "@/lib/@dsvgui/icons";

export const getUser: ViewComponent = (result, platform) => {
  return (
    <Metrics
      icon={CodewarsIcon}
      data={[
        { title: "Honor", value: result.honor },
        { title: "Rank", value: result.ranks.overall.name },
      ]}
    />
  );
};
