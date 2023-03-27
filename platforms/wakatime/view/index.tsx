import { ViewComponent } from "@/platforms/types";
import { WakatimeIcon } from "@/lib/@dsvgui/icons";
import { Metrics } from "@/lib/@dsvgui";

export const getAllTimeSinceToday: ViewComponent = (result, platform) => {
  return (
    <Metrics
      icon={WakatimeIcon}
      data={[{ title: "All time since today", value: result.text }]}
    />
  );
};
