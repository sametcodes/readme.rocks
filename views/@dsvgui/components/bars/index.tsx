import { Document, IconProps } from "@/views/@dsvgui";
import { Fragment } from "react";

type IBars = {
  icon: React.FC<IconProps>;
  data: {
    title: string;
    value: number | string;
  }[];
};

export const Bars: React.FC<IBars> = ({ data, icon: Icon }) => {
  const padding = 35;
  const col_width = 80;
  const width = data.length * col_width + padding + 50;

  return (
    <Document w={width} h={75}>
      <Icon x={25} y={22} />

      <g transform="translate(55, 0)">
        {data.map((item, index) => {
          let x = padding + index * col_width;
          let line_x = col_width * index + 20;

          return (
            <Fragment key={index}>
              <text
                fill="#878787"
                xmlSpace="preserve"
                fontFamily="Manrope"
                fontSize="11"
                letterSpacing="0.3px"
              >
                <tspan x={x} y={30}>
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
                <tspan x={x} y={53.5195}>
                  {item.value}
                </tspan>
              </text>

              {index !== 0 && (
                <line
                  x1={line_x}
                  y1={19}
                  x2={line_x}
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
