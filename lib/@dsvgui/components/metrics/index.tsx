import { Document, IconProps } from "@/lib/@dsvgui";
import { Fragment } from "react";
import { getTextWidth } from "@/lib/@dsvgui/utils";

type IMetrics = {
  icon: React.FC<IconProps>;
  data: Array<{
    title: string;
    value: number | string;
  }>;
};

export const Metrics: React.FC<IMetrics> = ({ data, icon: Icon }) => {
  const padding = 35;
  let initialPadding = 15;

  const width = data.reduce((acc, item) => {
    const wValue = getTextWidth(item.value.toString(), { fontSize: 22 });
    const wTitle = getTextWidth(item.title.toString(), { fontSize: 15 });
    const wText = Math.max(wValue, wTitle);

    return acc + wText + padding;
  }, padding + initialPadding);

  return (
    <Document w={width} h={35}>
      <Icon x={0} y={2} />

      <g transform="translate(45, 0)">
        {data.map((item, index) => {
          const wValue = getTextWidth(item.value.toString(), { fontSize: 22 });
          const wTitle = getTextWidth(item.title.toString(), { fontSize: 16 });
          const wText = Math.max(wValue, wTitle);

          const xText = initialPadding;
          initialPadding += wText + padding;
          const xLine = xText - 10;

          return (
            <Fragment key={index}>
              <text
                fill="#878787"
                xmlSpace="preserve"
                fontFamily="Manrope"
                className="subtitle"
              >
                <tspan x={xText} y={10}>
                  {item.title}
                </tspan>
              </text>
              <text
                fill="black"
                xmlSpace="preserve"
                fontFamily="Manrope"
                className="title"
                fontWeight="600"
              >
                <tspan x={xText} y={33.5195}>
                  {item.value}
                </tspan>
              </text>

              {index !== 0 && (
                <line x1={xLine} y1={2} x2={xLine} y2={35} stroke="#E3E3E3" />
              )}
            </Fragment>
          );
        })}
      </g>
    </Document>
  );
};
