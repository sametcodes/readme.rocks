import { Document } from "@/lib/@dsvgui";
import { getTextWidth, hexToRgb } from "@/lib/@dsvgui/utils/index";

type ILine = {
  leftTitle?: string;
  leftSubtitle?: string;
  rightTitle?: string;
  rightSubtitle?: string;
  points: Array<number>;
  period?: "month" | "weekday" | "day" | null;
  lineColor?: string;
};

export const Line: React.FC<ILine> = ({
  leftTitle = "",
  leftSubtitle = "",
  rightTitle = "",
  rightSubtitle = "",
  points,
  period,
  lineColor = "#000000",
}) => {
  const documentPadding = 40;
  const today = Date.now();
  const pointGap = 30;

  function createDynamicSvgPath({
    lineHeight,
    lineWidth,
    ratio,
  }: {
    lineHeight: number;
    lineWidth: number;
    ratio: number;
  }): string {
    const maxValue = Math.max(...points);
    const xGap = lineWidth / (points.length - 1);
    let x = -xGap;
    let path =
      "M " +
      (x + xGap) +
      " " +
      (lineHeight -
        (period ? 7 : -5) -
        (points[0] / maxValue) * lineHeight * ratio);

    for (const point of points) {
      x += xGap;
      path +=
        " L " +
        x +
        " " +
        (lineHeight -
          (period ? 7 : -5) -
          (point / maxValue) * lineHeight * ratio);
    }

    return path;
  }

  const leftTitleWidth = getTextWidth(leftTitle, { fontSize: 22, ratio: 0.58 });
  const leftSubtitleWidth = getTextWidth(leftSubtitle, {
    fontSize: 16,
    ratio: 0.57,
  });
  const leftTitlesWidth = Math.max(leftTitleWidth, leftSubtitleWidth);

  const rightTitleWidth = getTextWidth(rightTitle, {
    fontSize: 22,
    ratio: 0.58,
  });
  const rightSubtitleWidth = getTextWidth(rightSubtitle, {
    fontSize: 16,
    ratio: 0.527,
  });
  const rightTitlesWidth = Math.max(rightTitleWidth, rightSubtitleWidth);

  const totalTextWidth = leftTitlesWidth + rightTitlesWidth + 50;
  const height = 140;
  const totalPointWidth =
    points.length * pointGap < 100 ? 100 : points.length * pointGap;
  const width =
    totalPointWidth > totalTextWidth ? totalPointWidth : totalTextWidth;
  const pathValue = createDynamicSvgPath({
    lineHeight: height,
    lineWidth: width,
    ratio: 0.6,
  });

  let labels: Array<JSX.Element> = [];
  if (period) {
    labels = points.map((_, i) => {
      const dateGap = {
        month: 30,
        weekday: 1,
        day: 1,
      };
      const nthDay = points.length - i - 1;
      const date = new Date(
        today - nthDay * dateGap[period] * 24 * 60 * 60 * 1000
      );

      let dateOptions = {};
      if (period === "month") dateOptions = { month: "short" };
      if (period === "weekday") dateOptions = { weekday: "short" };
      if (period === "day") dateOptions = { day: "numeric" };

      const periodLabel = date.toLocaleDateString("en-US", dateOptions);
      const xGap = width / (points.length - 1);
      const x = i * xGap - getTextWidth(periodLabel, { fontSize: 8 }) / 2;
      return (
        <text key={i} className="clabel">
          <tspan x={x}>{periodLabel}</tspan>
        </text>
      );
    });
  }

  return (
    <Document w={width} h={height} padding={documentPadding}>
      <path
        d={pathValue}
        stroke="url(#paint0_linear_135_79)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="left">
        <text
          xmlSpace="preserve"
          fontFamily="Roboto"
          className="title"
          fontWeight="bolder"
          letterSpacing="0.5px"
        >
          <tspan x="0" y="15">
            {leftTitle}
          </tspan>
        </text>
        <text
          fill="#555555"
          xmlSpace="preserve"
          fontFamily="Roboto"
          className="subtitle"
          fontWeight={500}
        >
          <tspan x="0" y="33">
            {leftSubtitle}
          </tspan>
        </text>
      </g>
      <g id="right">
        <text className="title lineText" fontWeight="bolder">
          <tspan
            x={width - getTextWidth(rightTitle, { fontSize: 22, ratio: 0.5 })}
            y="15"
          >
            {rightTitle}
          </tspan>
        </text>
        <text className="subtitle lineText" fontWeight={300}>
          <tspan
            x={
              width - getTextWidth(rightSubtitle, { fontSize: 16, ratio: 0.46 })
            }
            y="33"
          >
            {rightSubtitle}
          </tspan>
        </text>
      </g>
      {period && (
        <g id="Labels" transform={`translate(0 ${height + 7})`}>
          {labels}
        </g>
      )}
      <defs>
        <style>{`
          .clabel{ fill: #999; font-size: 8px; }
          .lineText{ fill: ${lineColor} !important; }
        `}</style>
        <linearGradient
          x1="0"
          y1={height}
          x2={width}
          y2={height}
          id="paint0_linear_135_79"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop
            offset="0.141455"
            stopColor={`rgba(${hexToRgb(lineColor, 0.7).join(", ")})`}
          />
          <stop
            offset="0.201455"
            stopColor={`rgba(${hexToRgb(lineColor, 0.3).join(", ")})`}
          />
          <stop
            offset="0.363128"
            stopColor={`rgba(${hexToRgb(lineColor, 0.5).join(", ")})`}
          />
          <stop
            offset="0.581288"
            stopColor={`rgba(${hexToRgb(lineColor, 0.7).join(", ")})`}
          />
          <stop
            offset="0.729526"
            stopColor={`rgba(${hexToRgb(lineColor, 0.8).join(", ")})`}
          />
          <stop
            offset="0.923128"
            stopColor={`rgba(${hexToRgb(lineColor, 0.7).join(", ")})`}
          />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </Document>
  );
};
