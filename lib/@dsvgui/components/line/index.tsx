import { Document } from "@/lib/@dsvgui";
import { getTextWidth, hexToRgb } from "@/lib/@dsvgui/utils/index";
import { Text } from "../../document/text";

export type ILineItem = {
  leftTitle?: string;
  leftSubtitle?: string;
  rightTitle?: string;
  rightSubtitle?: string;
  points: Array<number>;
  lineColor?: string;
  period?: "month" | "weekday" | "day";
};

type ILine = {
  items: Array<ILineItem>;
};

export const Line: React.FC<ILine> = ({ items }) => {
  const documentPadding = 40;
  const today = Date.now();
  const pointGap = 30;
  const rowHeight = 140;
  const rowGap = 60;

  const height = rowHeight * items.length + rowGap * (items.length - 1);

  function createDynamicSvgPath(
    item: ILine["items"][0],
    {
      lineHeight,
      lineWidth,
      ratio,
    }: {
      lineHeight: number;
      lineWidth: number;
      ratio: number;
    }
  ): string {
    const maxValue = Math.max(...item.points);
    const xGap = lineWidth / (item.points.length - 1);
    let x = -xGap;
    let path =
      "M " +
      (x + xGap).toFixed(3) +
      " " +
      (
        lineHeight -
        (item.period ? 7 : -5) -
        (item.points[0] / maxValue) * lineHeight * ratio
      ).toFixed(3);

    for (const point of item.points) {
      x += xGap;
      path +=
        " L " +
        x +
        " " +
        (
          lineHeight -
          (item.period ? 7 : -5) -
          (point / maxValue) * lineHeight * ratio
        ).toFixed(3);
    }

    return path;
  }

  const widths = items.map((item) => {
    const leftTitleWidth = getTextWidth(item.leftTitle || "", {
      fontSize: 22,
      fontWeight: 700,
    });
    const leftSubtitleWidth = getTextWidth(item.leftSubtitle || "", {
      fontSize: 16,
      fontWeight: 500,
    });
    const leftTitlesWidth = Math.max(leftTitleWidth, leftSubtitleWidth);

    const rightTitleWidth = getTextWidth(item.rightTitle || "", {
      fontSize: 22,
      fontWeight: 700,
    });
    const rightSubtitleWidth = getTextWidth(item.rightSubtitle || "", {
      fontSize: 16,
      fontWeight: 500,
    });
    const rightTitlesWidth = Math.max(rightTitleWidth, rightSubtitleWidth);

    const totalTextWidth = leftTitlesWidth + rightTitlesWidth + 50;
    const totalPointWidth =
      item.points.length * pointGap < 100 ? 100 : item.points.length * pointGap;
    const totalWidth =
      totalPointWidth > totalTextWidth ? totalPointWidth : totalTextWidth;
    return totalWidth + documentPadding;
  });

  const width = Math.max(...widths);
  const _items = items.map((item, index) => {
    const pathValue = createDynamicSvgPath(item, {
      lineHeight: rowHeight,
      lineWidth: width,
      ratio: 0.6,
    });

    let labels: Array<JSX.Element> = [];
    if (item.period) {
      labels = item.points.map((_, i) => {
        const dateGap = { month: 30, weekday: 1, day: 1 };
        const nthDay = item.points.length - i - 1;

        let date = new Date();
        if (item.period) {
          date = new Date(
            today - nthDay * dateGap[item.period] * 24 * 60 * 60 * 1000
          );
        }

        let dateOptions = {};
        if (item.period === "month") dateOptions = { month: "short" };
        if (item.period === "weekday") dateOptions = { weekday: "short" };
        if (item.period === "day") dateOptions = { day: "numeric" };

        const periodLabel = date.toLocaleDateString("en-US", dateOptions);
        const xGap = width / (item.points.length - 1);
        return (
          <Text
            key={index}
            x={(textWidth) => i * xGap - textWidth / 2}
            y={0}
            option={{ size: 8, weight: 300 }}
          >
            {periodLabel}
          </Text>
        );
      });
    }
    return (
      <g key={index} transform={`translate(0 ${(rowHeight + rowGap) * index})`}>
        <path
          d={pathValue}
          stroke={`url(#line_gradient_${index})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="left">
          <Text x={0} y={15} option="title">
            {item.leftTitle}
          </Text>
          <Text x={0} y={34} option="subtitle">
            {item.leftSubtitle}
          </Text>
        </g>
        <g id="right">
          <Text option="title" x={(textWidth) => width - textWidth} y={15}>
            {item.rightTitle}
          </Text>
          <Text option="subtitle" x={(textWidth) => width - textWidth} y={34}>
            {item.rightSubtitle}
          </Text>
        </g>
        {item.period && (
          <g id="Labels" transform={`translate(0 ${rowHeight + 7})`}>
            {labels}
          </g>
        )}

        {index !== 0 && (
          <rect
            x="0"
            y={-rowGap / 2}
            width={width}
            height={1}
            rx={5}
            fill="#E4E4E4"
          />
        )}

        <defs>
          <style>{`
          .lineText_${index}{ fill: ${item.lineColor} !important; }
          .subtitle.lineText_${index}{ fill: rgba(${hexToRgb(
            item.lineColor || "#000000",
            0.6
          ).join(", ")}) !important; }
        `}</style>
          <linearGradient
            x1="0"
            y1={rowHeight}
            x2={width}
            y2={rowHeight}
            id={`line_gradient_${index}`}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" />
            <stop
              offset="0.15"
              stopColor={`rgba(${hexToRgb(
                item.lineColor || "#000000",
                0.7
              ).join(", ")})`}
            />
            <stop
              offset="0.20"
              stopColor={`rgba(${hexToRgb(
                item.lineColor || "#000000",
                0.3
              ).join(", ")})`}
            />
            <stop
              offset="0.4"
              stopColor={`rgba(${hexToRgb(
                item.lineColor || "#000000",
                0.5
              ).join(", ")})`}
            />
            <stop
              offset="0.6"
              stopColor={`rgba(${hexToRgb(
                item.lineColor || "#000000",
                0.7
              ).join(", ")})`}
            />
            <stop
              offset="0.8"
              stopColor={`rgba(${hexToRgb(
                item.lineColor || "#000000",
                0.8
              ).join(", ")})`}
            />
            <stop
              offset="0.9"
              stopColor={`rgba(${hexToRgb(
                item.lineColor || "#000000",
                0.7
              ).join(", ")})`}
            />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </g>
    );
  });

  return (
    <Document w={width} h={height} padding={documentPadding}>
      {_items}
    </Document>
  );
};
