import { ViewComponent } from "@/views/queries/types";
import { Bars } from "@/views/@dsvgui";
import { StackOverflowIcon } from "@/views/@dsvgui/icons";

export const getReputation: ViewComponent = (result, platform) => {
  const [{ reputation }] = result.data.items;

  return (
    <Bars
      icon={StackOverflowIcon}
      data={[{ title: "Reputation", value: reputation }]}
    />
  );
};
