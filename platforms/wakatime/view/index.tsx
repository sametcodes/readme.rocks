import { ViewComponent } from "@/platforms/types";
import { WakatimeIcon } from "@/lib/@dsvgui/icons";
import { Metrics, Line } from "@/lib/@dsvgui";

export const getAllTimeSinceToday: ViewComponent = (result, config) => {
  return (
    <Metrics
      icon={WakatimeIcon}
      data={[{ title: "All time since today", value: result.data.text }]}
    />
  );
};

export const getTimeWithRange: ViewComponent = (result, config) => {
  const subtitle = (config.queryConfig as any).range;
  const points = result.data.map((day: any) => day.grand_total.total_seconds);
  return (
    <Line
      title="Wakatime"
      subtitle={subtitle}
      points={points}
      total={result.cumulative_total.text}
    />
  );
};
