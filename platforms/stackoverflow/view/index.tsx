import { ViewComponent } from "@/platforms/types";
import { Metrics } from "@/lib/@dsvgui";
import { BsStackOverflow } from "react-icons/bs";

export const getReputation: ViewComponent = (result, platform) => {
  const [{ reputation }] = result.items;

  return (
    <Metrics
      icon={BsStackOverflow}
      data={[{ title: "Reputation", value: reputation }]}
    />
  );
};
