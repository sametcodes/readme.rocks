import { Document, Text } from "@/lib/@dsvgui";
import { stringToColorCode } from "@/lib/@dsvgui/utils";
import { getTextWidth } from "../../utils/index";

export type IBarStats = {
  title: string;
  subtitle?: string;
  items: Array<{
    key: string;
    name: string;
    value: number;
  }>;
  items_per_row?: number;
};

export const BarStats: React.FC<IBarStats> = ({
  title,
  subtitle,
  items,
  items_per_row = 2,
}) => {
  const width = Math.max(
    getTextWidth(title, { fontSize: 22, fontWeight: 700 }),
    330
  );
  const totalBarWidth = width;
  const legendMy = 20;

  const height = 70 + Math.ceil(items.length / items_per_row) * legendMy;
  const totalValue = items.reduce((acc, item) => acc + item.value, 0);

  let tempBarWidth = 0;
  return (
    <Document w={width} h={height}>
      <g xmlns="http://www.w3.org/2000/svg" id="Widget">
        <g id="content">
          <g id="Frame 134">
            <g id="title">
              <Text x={0} y={21.5} option="title">
                {title}
              </Text>
            </g>
            <g id="subtitle">
              <Text x={0} y={40} option="subtitle">
                {subtitle}
              </Text>
            </g>
            <g id="bars" shapeRendering="crispEdges">
              {items.map((item, index, array) => {
                const barWidth = (item.value / totalValue) * totalBarWidth;
                const prevBarWidth = array[index - 1]
                  ? (array[index - 1].value / totalValue) * totalBarWidth
                  : 0;
                tempBarWidth += prevBarWidth;
                return (
                  <g id={`bar${index}`} key={index}>
                    <rect
                      style={{ transition: "all 0.5s ease" }}
                      width={barWidth}
                      height="10"
                      transform={`translate(${tempBarWidth + 0}, 55)`}
                      fill={stringToColorCode(item.key)}
                    />
                  </g>
                );
              })}
            </g>
            <g id="legends">
              <g id="row">
                {items.map((item, index) => {
                  const circleSize = 6;
                  const x =
                    circleSize +
                    (index % items_per_row ? width / items_per_row : 0);
                  const y =
                    80 + Math.floor(index / items_per_row) * legendMy + 5;
                  return (
                    <g id={`legend${index}`} key={index}>
                      <circle
                        cx={x}
                        cy={y}
                        r={circleSize}
                        fill={stringToColorCode(item.key)}
                      />
                      <Text
                        x={x + 15}
                        y={y + 5}
                        option={{
                          size: 14,
                          weight: 500,
                        }}
                        className="subtitle"
                      >
                        {`${item.name} %${(
                          (item.value / totalValue) *
                          100
                        ).toFixed(1)}`}
                      </Text>
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
