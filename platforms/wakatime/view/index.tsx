import { ViewComponent } from "@/platforms/types";
import { WakatimeIcon } from "@/lib/@dsvgui/icons";
import { Bars } from "@/lib/@dsvgui";

export const getAllTimeSinceToday: ViewComponent = (result, platform) => {
  return (
    <Bars
      icon={WakatimeIcon}
      data={[{ title: "All time since today", value: result.text }]}
    />
  );
};
