import { ViewComponent } from "@/platforms/types";
import { Bars } from "@/lib/@dsvgui";
import { StackOverflowIcon } from "@/lib/@dsvgui/icons";

export const getReputation: ViewComponent = (result, platform) => {
  const [{ reputation }] = result.data.items;

  return (
    <Bars
      icon={StackOverflowIcon}
      data={[{ title: "Reputation", value: reputation }]}
    />
  );
};
