import { Document } from "@/lib/@dsvgui";
import { Text } from "@/lib/@dsvgui/document/text";
import { Fragment } from "react";
import { getTextWidth } from "@/lib/@dsvgui/utils";
import { IconType } from "react-icons/lib";

type IMetrics = {
  icon: IconType;
  data: Array<{
    title: string;
    value: number | string;
  }>;
};

export const Metrics: React.FC<IMetrics> = ({ data, icon: Icon }) => {
  const padding = 35;
  let initialPadding = 15;

  const width = data.reduce((acc, item) => {
    const wValue = getTextWidth(item.value.toString(), {
      fontSize: 22,
      fontWeight: 700,
    });
    const wTitle = getTextWidth(item.title.toString(), {
      fontSize: 16,
      fontWeight: 500,
    });
    const wText = Math.max(wValue, wTitle);

    return acc + wText + padding;
  }, padding + initialPadding);

  return (
    <Document w={width} h={35}>
      <Icon x={0} y={0} size="33px" className="icon" />

      <g transform="translate(45, 0)">
        {data.map((item, index) => {
          const wTitle = getTextWidth(item.title.toString(), {
            fontSize: 16,
            fontWeight: 500,
          });
          const wValue = getTextWidth(item.value.toString(), {
            fontSize: 22,
            fontWeight: 700,
          });
          const wText = Math.max(wValue, wTitle);

          const xText = initialPadding;
          initialPadding += wText + padding;
          const xLine = xText - 10;

          return (
            <Fragment key={index}>
              <Text x={xText} y={10} option="subtitle">
                {item.title}
              </Text>
              <Text x={xText} y={33.51} option={{ size: 22, weight: 500 }}>
                {item.value.toString()}
              </Text>
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
