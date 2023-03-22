import { ViewComponent } from "@/platforms/types";
import { Bars } from "@/components/@dsvgui";
import { StackOverflowIcon } from "@/components/@dsvgui/icons";

export const getReputation: ViewComponent = (result, platform) => {
  const [{ reputation }] = result.data.items;

  return (
    <Bars
      icon={StackOverflowIcon}
      data={[{ title: "Reputation", value: reputation }]}
    />
  );
};
