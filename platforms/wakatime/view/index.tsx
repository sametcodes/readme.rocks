import { ViewComponent } from "@/platforms/types";
import { WakatimeIcon } from "@/components/@dsvgui/icons";
import { Bars } from "@/components/@dsvgui";

export const getAllTimeSinceToday: ViewComponent = (result, platform) => {
  return (
    <Bars
      icon={WakatimeIcon}
      data={[{ title: "All time since today", value: result.text }]}
    />
  );
};
