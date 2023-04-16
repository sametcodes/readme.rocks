import { ViewComponent } from "@/platforms/types";
import { Metrics } from "@/lib/@dsvgui";
import { SiCodewars } from "react-icons/si";

export const getUser: ViewComponent = (result, platform) => {
  return (
    <Metrics
      icon={SiCodewars}
      data={[
        { title: "Honor", value: result.honor },
        { title: "Rank", value: result.ranks.overall.name },
      ]}
    />
  );
};
