import { ViewComponent } from "@/views/queries/types";
import { Bars } from "@/views/@dsvgui";
import { CodewarsIcon } from "@/views/@dsvgui/icons";

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
