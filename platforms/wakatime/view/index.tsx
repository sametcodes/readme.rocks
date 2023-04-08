import { ViewComponent } from "@/platforms/types";
import { WakatimeIcon } from "@/lib/@dsvgui/icons";
import { Metrics, Line, BarStats, IBarStats } from "@/lib/@dsvgui";

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

export const getMostUsedLanguages: ViewComponent = (result, config) => {
  const subtitles = {
    last_7_days: "Last 7 days",
    last_30_days: "Last 30 days",
    last_6_months: "Last 6 months",
    last_year: "Last year",
    all_time: "All time",
  };

  const range: keyof typeof subtitles = (config.queryConfig as any).range;
  const { language_count } = config.viewConfig as any;

  const total_seconds = result.data.languages
    .slice(0, language_count)
    .reduce((acc: number, el: any) => acc + el.total_seconds, 0);

  const value: IBarStats["value"] = result.data.languages
    .slice(0, language_count)
    .map((lang: any) => ({
      name: lang.name,
      percent: (lang.total_seconds / total_seconds) * 100,
    }));

  return (
    <BarStats
      title="Most used languages by Wakatime"
      subtitle={subtitles[range]}
      value={value}
    />
  );
};
