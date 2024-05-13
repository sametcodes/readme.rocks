import React from "react";

import { Document, Text, getDocumentSize } from "../../document";
import { generateColorVariations } from "../../utils";
import { DocumentMeta } from "../../document/type";

export type ICalendar = {
  title?: string;
  subtitle?: string;
  weekCount?: number;
  boxColor?: string;
  dates: { [key: string]: number };
  showMonthLabels?: boolean;
  showStreak?: boolean;
} & DocumentMeta;

export const calendarDocumentPreferences = {
  minW: 3,
  minH: 1,
  maxW: 8,
  maxH: 2,
  default: {
    w: 4,
    h: 2,
  },
};

export const Calendar: React.FC<ICalendar> = ({
  title,
  subtitle,
  weekCount = 52,
  boxColor = "#40c463",
  dates,
  showMonthLabels = true,
  showStreak = false,
  document,
}) => {
  document = document || calendarDocumentPreferences.default;
  const { width, height } = getDocumentSize(document);
  const isCompact = document.h === 1;
  weekCount = document.w * 6.2;

  title = isCompact ? "" : title;
  subtitle = isCompact ? "" : subtitle;
  showStreak = isCompact ? false : showStreak;

  const dayCount = 7;
  const boxMargin = 3;
  const boxSize = (width - 30) / weekCount - boxMargin - (isCompact ? 4 : 0);
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
                x={
                  (weekIndex - 1) * (boxSize + boxMargin) - (isCompact ? 5 : 0)
                }
                y={
                  (dayIndex - 1) * (boxSize + boxMargin) - (isCompact ? 7.5 : 0)
                }
                width={boxSize}
                rx="2px"
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
      const x = (weekCount - i * 4) * (boxSize + boxMargin) - boxSize / 2 - 25;
      return (
        <Text
          key={monthString}
          x={x > 0 ? x : 0}
          y={170}
          option={{ size: 12, weight: 500 }}
        >
          {monthString}
        </Text>
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
              <Text x={0} y={18} option="title">
                {title}
              </Text>
            )}
            {title && subtitle && (
              <Text x={0} y={38} option="subtitle">
                {subtitle}
              </Text>
            )}
            {showStreak && (
              <>
                <Text
                  x={(textWidth) => width - textWidth - 40}
                  y={18}
                  option="title"
                >
                  {streak}
                </Text>
                <Text
                  x={(textWidth) => width - textWidth - 40}
                  y={36}
                  option="subtitle"
                >
                  Streak
                </Text>
              </>
            )}
          </g>
        )}
        {isCompact && (
          <>
            <Text
              x={(textWidth) => width - textWidth - 40}
              y={18}
              option="title"
            >
              {streak}
            </Text>
            <Text
              x={(textWidth) => width - textWidth - 40}
              y={36}
              option="subtitle"
            >
              Streak
            </Text>
          </>
        )}
        <g id="Weeks" transform={`translate(0 ${headerHeight - 5})`}>
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
