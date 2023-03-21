import { ViewComponent } from "@/platforms/types";
import { Bars } from "@/components/@dsvgui";
import { CodewarsIcon } from "@/components/@dsvgui/icons";

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
