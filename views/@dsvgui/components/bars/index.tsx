import { Document, IconProps } from "@/views/@dsvgui";
import { Fragment } from "react";
import { getTextWidth } from "@/views/@dsvgui/utils";

type IBars = {
  icon: React.FC<IconProps>;
  data: {
    title: string;
    value: number | string;
  }[];
};

export const Bars: React.FC<IBars> = ({ data, icon: Icon }) => {
  const padding = 40;
  let initial_padding = 30;

  const width = data.reduce((acc, item) => {
    const w_value = getTextWidth(item.value.toString(), { fontSize: 22 });
    const w_title = getTextWidth(item.title.toString(), { fontSize: 11 });
    const w_text = Math.max(w_value, w_title);

    return acc + w_text + padding;
  }, padding + initial_padding);

  return (
    <Document w={width} h={75}>
      <Icon x={25} y={22} />

      <g transform="translate(55, 0)">
        {data.map((item, index) => {
          const w_value = getTextWidth(item.value.toString(), { fontSize: 22 });
          const w_title = getTextWidth(item.title.toString(), { fontSize: 11 });
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
                fontSize="11"
                letterSpacing="0.3px"
              >
                <tspan x={x_text} y={30}>
                  {item.title}
                </tspan>
              </text>
              <text
                fill="black"
                xmlSpace="preserve"
                fontFamily="Manrope"
                fontSize="22"
                fontWeight="600"
                letterSpacing="0.3px"
              >
                <tspan x={x_text} y={53.5195}>
                  {item.value}
                </tspan>
              </text>

              {index !== 0 && (
                <line
                  x1={x_line}
                  y1={19}
                  x2={x_line}
                  y2={56}
                  stroke="#E3E3E3"
                />
              )}
            </Fragment>
          );
        })}
      </g>
    </Document>
  );
};
