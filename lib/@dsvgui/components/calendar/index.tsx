import { Document } from "@/lib/@dsvgui";
import { generateColorVariations } from "@/lib/@dsvgui/utils";

export type ICalendar = {
  title?: string;
  subtitle?: string;
  weekCount?: number;
  boxColor: string;
  dates: { [key: string]: number };
};

export const Calendar: React.FC<ICalendar> = ({
  title,
  subtitle,
  weekCount = 52,
  boxColor = "#40c463",
  dates,
}) => {
  const dayCount = 7;
  const boxSize = 13;
  const boxMargin = 5;

  const endColors = { light: "#ebedf0", dark: "#394C56" };
  const colors = {
    light: generateColorVariations(boxColor, endColors.light).reverse(),
    dark: generateColorVariations(boxColor, endColors.dark).reverse(),
  };

  const headerHeight = (title ? 22 : 0) + (title && subtitle ? 16 : 0) + 10;
  const calendarHeight = dayCount * (boxSize + boxMargin);

  const width = weekCount * (boxSize + boxMargin);
  const height = calendarHeight + headerHeight + 10;

  const today = Date.now();

  const maxValue = Math.max(...Object.values(dates));
  const getLevelColor = (value: number): string => {
    if (value >= maxValue * 0.8) return "c4";
    if (value >= maxValue * 0.6) return "c3";
    if (value >= maxValue * 0.4) return "c2";
    if (value > 0) return "c1";
    return "c0";
  };

  const fillDates = (): React.ReactNode => {
    const weeksArray = Array.from({ length: weekCount }, (_, i) => i + 1);
    const daysArray = Array.from({ length: dayCount }, (_, i) => i + 1);

    const totalDays = weeksArray.length * daysArray.length;
    return weeksArray.map((weekIndex) => {
      return (
        <g key={weekIndex} id={`Week ${weekIndex + 1}`}>
          {daysArray.map((dayIndex) => {
            const nthDay =
              totalDays - weekIndex * dayCount + (dayCount - dayIndex);

            const date = new Date(today - nthDay * 24 * 60 * 60 * 1000);
            const dateString = date.toISOString().split("T")[0];

            let color = "c0";
            if (dateString in dates && dates[dateString] > 0) {
              color = getLevelColor(dates[dateString]);
            }

            return (
              <rect
                key={`${nthDay}`}
                id={`${dateString}`}
                x={(weekIndex - 1) * (boxSize + boxMargin)}
                y={(dayIndex - 1) * (boxSize + boxMargin)}
                width={boxSize}
                height={boxSize}
                rx="3"
                className={color}
              />
            );
          })}
        </g>
      );
    });
  };

  const months = Array.from({ length: Math.ceil(weekCount / 4) }).map(
    (_, i) => {
      const month = new Date(today - i * 30 * 24 * 60 * 60 * 1000);
      const monthString = month.toLocaleString("default", { month: "short" });
      const x = width - i * 4 * (boxSize + boxMargin + 1) - 25;
      return (
        <text key={monthString} id={monthString} className="clabel">
          <tspan x={x > 0 ? x : 0} y="165.864">
            {monthString}
          </tspan>
        </text>
      );
    }
  );

  const weeks = fillDates();

  return (
    <Document w={width} h={height}>
      <g id="Content">
        {(title || subtitle) && (
          <g id="Title">
            {title && (
              <text xmlSpace="preserve" className="title">
                <tspan x="0" y="18">
                  {title}
                </tspan>
              </text>
            )}
            {title && subtitle && (
              <text xmlSpace="preserve" className="subtitle">
                <tspan x="0" y="38">
                  {subtitle}
                </tspan>
              </text>
            )}
          </g>
        )}
        <g id="Weeks" transform={`translate(0 ${headerHeight})`}>
          {weeks}
        </g>
        <g id="Labels" transform={`translate(0 ${headerHeight - 30})`}>
          {months}
        </g>
      </g>
      <defs>
        <style>
          {`
            .clabel { font-size: 12px; fill: #AFB4BD; }
            .c0 { fill: ${endColors.light}; }
            .c1 { fill: ${colors.light[1]}; }
            .c2 { fill: ${colors.light[2]}; }
            .c3 { fill: ${colors.light[3]}; }
            .c4 { fill: ${colors.light[4]}; }
            @media (prefers-color-scheme: dark) {
              .c0 { fill: ${endColors.dark} }
              .c1 { fill: ${colors.dark[1]}; }
              .c2 { fill: ${colors.dark[2]}; }
              .c3 { fill: ${colors.dark[3]}; }
              .c4 { fill: ${colors.dark[4]}; }
            }
          `}
        </style>
      </defs>
    </Document>
  );
};
