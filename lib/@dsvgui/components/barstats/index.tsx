import { Document } from "@/lib/@dsvgui";
import { stringToColorCode } from "@/lib/@dsvgui/utils";
import { getTextWidth } from "../../utils/index";

export type IBarStats = {
  title: string;
  subtitle?: string;
  value: {
    key: string;
    name: string;
    percent: number;
  }[];
  items_per_row?: number;
};

export const BarStats: React.FC<IBarStats> = ({
  title,
  subtitle,
  value,
  items_per_row = 2,
}) => {
  const width = Math.max(getTextWidth(title, { fontSize: 24 }), 330);
  const total_bar_width = width;
  const legend_my = 20;

  const height = 70 + Math.ceil(value.length / items_per_row) * legend_my;

  let temp_bar_width = 0;
  return (
    <Document w={width} h={height}>
      <g xmlns="http://www.w3.org/2000/svg" id="Widget">
        <g id="content">
          <g id="Frame 134">
            <g id="title">
              <text
                id="Most used languages"
                className="title"
                xmlSpace="preserve"
                fontFamily="Manrope"
                fontWeight="600"
                letterSpacing="0px"
              >
                <tspan x="0" y="21.511">
                  {title}
                </tspan>
              </text>
            </g>
            <g id="subtitle">
              <text
                id="in the last 7 days"
                className="subtitle"
                xmlSpace="preserve"
                fontFamily="Manrope"
                fontWeight="600"
                letterSpacing="0px"
              >
                <tspan x="0" y="40">
                  {subtitle}
                </tspan>
              </text>
            </g>
            <g id="bars" shapeRendering="crispEdges">
              {value.map((item, index, array) => {
                const bar_width = (item.percent / 100) * total_bar_width;
                const prev_bar_width = array[index - 1]
                  ? (array[index - 1].percent / 100) * total_bar_width
                  : 0;
                temp_bar_width += prev_bar_width;
                return (
                  <g id={`bar${index}`} key={index}>
                    <rect
                      style={{ transition: "all 0.5s ease" }}
                      width={bar_width}
                      height="10"
                      transform={`translate(${temp_bar_width + 0}, 55)`}
                      fill={stringToColorCode(item.key)}
                    />
                  </g>
                );
              })}
            </g>
            <g id="legends">
              <g id="row">
                {value.map((item, index) => {
                  const circle_size = 6;
                  const x = circle_size + (index % items_per_row ? 150 : 0);
                  const y =
                    80 + Math.floor(index / items_per_row) * legend_my + 5;
                  return (
                    <g id={`legend${index}`} key={index}>
                      <circle
                        cx={x}
                        cy={y}
                        r={circle_size}
                        fill={stringToColorCode(item.key)}
                      />
                      <text
                        xmlSpace="preserve"
                        fontFamily="Manrope"
                        fontSize="12"
                        fill="#5E5E5E"
                        letterSpacing="0px"
                      >
                        <tspan x={x + 15} y={y + 4}>
                          {item.name}{" "}
                          <tspan fontWeight="bolder">
                            %{item.percent.toFixed(2)}
                          </tspan>
                        </tspan>
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>
          </g>
        </g>
      </g>
    </Document>
  );
};
