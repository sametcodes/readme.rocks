import { Document, IconProps } from "@/lib/@dsvgui";
import { Fragment } from "react";
import { getTextWidth } from "@/lib/@dsvgui/utils";

type IMetrics = {
  icon: React.FC<IconProps>;
  data: {
    title: string;
    value: number | string;
  }[];
};

export const Metrics: React.FC<IMetrics> = ({ data, icon: Icon }) => {
  const padding = 35;
  let initial_padding = 15;

  const width = data.reduce((acc, item) => {
    const w_value = getTextWidth(item.value.toString(), { fontSize: 22 });
    const w_title = getTextWidth(item.title.toString(), { fontSize: 11 });
    const w_text = Math.max(w_value, w_title);

    return acc + w_text + padding;
  }, padding + initial_padding);

  return (
    <Document w={width} h={35}>
      <Icon x={0} y={2} />

      <g transform="translate(45, 0)">
        {data.map((item, index) => {
          const w_value = getTextWidth(item.value.toString(), { fontSize: 22 });
          const w_title = getTextWidth(item.title.toString(), { fontSize: 16 });
          const w_text = Math.max(w_value, w_title);

          const x_text = initial_padding;
          initial_padding += w_text + padding;
          let x_line = x_text - 10;

          return (
            <Fragment key={index}>
              <text
                fill="#878787"
                xmlSpace="preserve"
                fontFamily="Manrope"
                className="subtitle"
              >
                <tspan x={x_text} y={10}>
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
                <tspan x={x_text} y={33.5195}>
                  {item.value}
                </tspan>
              </text>

              {index !== 0 && (
                <line x1={x_line} y1={2} x2={x_line} y2={35} stroke="#E3E3E3" />
              )}
            </Fragment>
          );
        })}
      </g>
    </Document>
  );
};
