import { Document } from "@/lib/@dsvgui";
import { generateColorVariations } from "@/lib/@dsvgui/utils";
import { getTextWidth } from "../../utils/index";

export type ICalendar = {
  title?: string;
  subtitle?: string;
  weekCount?: number;
  boxColor?: string;
  dates: { [key: string]: number };
  showMonthLabels?: boolean;
  showStreak?: boolean;
};

export const Calendar: React.FC<ICalendar> = ({
  title,
  subtitle,
  weekCount = 52,
  boxColor = "#40c463",
  dates,
  showMonthLabels = true,
  showStreak = false,
}) => {
  const dayCount = 7;
  const boxSize = 13;
  const boxMargin = 5;
  const documentColorId = "_" + Math.random().toString(36).substr(2, 5);

  const today = Date.now();
  dates = Object.entries(dates).reduce(
    (acc: { [key: string]: number }, [key, value]) => {
      if (today - new Date(key).getTime() > weekCount * 7 * 24 * 60 * 60 * 1000)
        return acc;
      acc[key] = value;
      return acc;
    },
    {}
  );

  const variationsCount = 5;
  const colors = generateColorVariations(boxColor, variationsCount);
  const colorStyles = `
    ${colors
      .map((color, i) => `.${documentColorId}_c${i} { fill: ${color}; }`)
      .join("\n")}
  `;

  const headerHeight =
    (title || showStreak ? 22 : 0) +
    ((title && subtitle) || showStreak ? 16 : 0) +
    (title || subtitle || showStreak ? 15 : 0);
  const calendarHeight = dayCount * (boxSize + boxMargin);

  const width = weekCount * (boxSize + boxMargin) - boxMargin;
  const height = calendarHeight + headerHeight + ((showMonthLabels && 15) || 0);

  const totalValue = Object.values(dates).reduce(
    (acc, value) => acc + value,
    0
  );
  const averageValue = totalValue / Object.keys(dates).length;

  const getLevelColor = (value: number): string => {
    const level = Math.ceil((value / averageValue) * variationsCount);
    if (level >= variationsCount) {
      return `${documentColorId}_c${variationsCount}`;
    }
    return `${documentColorId}_c${level}`;
  };

  function calculateStreak() {
    let tempStreak = 0;

    const sortedDates = Object.entries(dates).sort((a, b) => {
      return new Date(b[0]).getTime() - new Date(a[0]).getTime();
    });

    const days = sortedDates.map((sortedDate) => sortedDate[0]);
    const values = sortedDates.map((sortedDate) => sortedDate[1]);

    for (let i = 1; i < days.length; i++) {
      const compareDate = [new Date(days[i - 1]), new Date(days[i])];

      const todayDate = new Date().toISOString().split("T")[0];
      if (todayDate === days[i - 1]) {
        continue;
      }

      const dayDifference =
        (compareDate[0].getTime() - compareDate[1].getTime()) /
        (1000 * 60 * 60 * 24);
      if (values[i - 1] > 0 && dayDifference === 1) {
        tempStreak++;
      } else {
        break;
      }
    }

    return tempStreak;
  }

  const streak = calculateStreak();

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

            let color = `${documentColorId}_c0`;
            if (dateString in dates && dates[dateString] > 0) {
              color = getLevelColor(dates[dateString]);
            }

            return (
              <rect
                key={`${nthDay}`}
                id={`${dateString}`}
                data-value={dates[dateString] || 0}
                x={(weekIndex - 1) * (boxSize + boxMargin)}
                y={(dayIndex - 1) * (boxSize + boxMargin)}
                width={boxSize}
                rx="3px"
                height={boxSize}
                className={[color, "d"].filter(Boolean).join(" ")}
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
        {(title || subtitle || showStreak) && (
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
            {showStreak && (
              <>
                <text xmlSpace="preserve" className="title">
                  <tspan
                    x={width - getTextWidth(streak, { fontSize: 22 })}
                    y="18"
                  >
                    {streak}
                  </tspan>
                </text>
                <text xmlSpace="preserve" className="subtitle">
                  <tspan
                    x={width - getTextWidth("Streak", { fontSize: 16 })}
                    y="38"
                  >
                    Streak
                  </tspan>
                </text>
              </>
            )}
          </g>
        )}
        <g id="Weeks" transform={`translate(0 ${headerHeight})`}>
          {weeks}
        </g>
        {showMonthLabels && (
          <g id="Labels" transform={`translate(0 ${headerHeight - 30})`}>
            {months}
          </g>
        )}
      </g>
      <defs>
        <style>
          {`
            .clabel { font-size: 12px; fill: #AFB4BD; }
            ${colorStyles}
            rect.d{ stroke: rgba(27, 31, 35, 0.1); }
            @media (prefers-color-scheme: dark) {
              rect.d{ stroke: rgba(178, 174, 170, 0.1); }
              .clabel { fill: #878787; }
            }
          `}
        </style>
      </defs>
    </Document>
  );
};
