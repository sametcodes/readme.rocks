import { ViewComponent } from "@/platforms/types";
import { Bars } from "@/lib/@dsvgui";
import { CodewarsIcon } from "@/lib/@dsvgui/icons";

export const getUser: ViewComponent = (result, platform) => {
  return (
    <Bars
      icon={CodewarsIcon}
      data={[
        { title: "Honor", value: result.honor },
        { title: "Rank", value: result.ranks.overall.name },
      ]}
    />
  );
};
