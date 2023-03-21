import { ViewComponent } from "@/views/queries/types";
import { WakatimeIcon } from "@/views/@dsvgui/icons";
import { Bars } from "@/views/@dsvgui";

export const getAllTimeSinceToday: ViewComponent = (result, platform) => {
  return (
    <Bars
      icon={WakatimeIcon}
      data={[{ title: "All time since today", value: result.text }]}
    />
  );
};
