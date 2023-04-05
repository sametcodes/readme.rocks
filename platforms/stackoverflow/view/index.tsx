import { ViewComponent } from "@/platforms/types";
import { Metrics } from "@/lib/@dsvgui";
import { StackOverflowIcon } from "@/lib/@dsvgui/icons";

export const getReputation: ViewComponent = (result, platform) => {
  const [{ reputation }] = result.items;

  return (
    <Metrics
      icon={StackOverflowIcon}
      data={[{ title: "Reputation", value: reputation }]}
    />
  );
};
