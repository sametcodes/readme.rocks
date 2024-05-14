import React from "react";

import { Document, Text, getDocumentSize } from "../..";
import { stringToColorCode } from "../../utils";
import { DocumentMeta } from "../../document/type";

export type IBarStats = {
  title: string;
  subtitle?: string;
  items: Array<{
    key: string;
    name: string;
    value: number;
  }>;
  items_per_row?: number;
} & DocumentMeta;

export const barstatsDocumentPreferences = {
  minW: 4,
  minH: 2,
  maxW: 5,
  maxH: 2,
  default: {
    w: 5,
    h: 2,
  },
};

export const BarStats: React.FC<IBarStats> = ({
  title,
  subtitle,
  items,
  items_per_row = 2,
  document,
}) => {
  document = document || barstatsDocumentPreferences.default;
  const { width, height } = getDocumentSize(document);
  const totalBarWidth = width - 50;

  const legendMy = 20;
  const totalValue = items.reduce((acc, item) => acc + item.value, 0);

  items_per_row = document.w <= 2 ? 1 : items_per_row;
  const barHeight = 20;

  // if items_per_row is 2, slice it to 6 items
  // if items_per_row is 1, slice it to 3 items
  const slicedItems = items.slice(0, items_per_row * 3);

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
                  <g id={`bar${index}`} key={`bar${index}`}>
                    <rect
                      style={{ transition: "all 0.5s ease" }}
                      width={barWidth}
                      height={barHeight}
                      transform={`translate(${tempBarWidth + 0}, 55)`}
                      fill={stringToColorCode(item.key)}
                    />
                  </g>
                );
              })}
            </g>
            <g id="legends">
              <g id="row">
                {slicedItems.map((item, index) => {
                  const circleSize = 6;
                  const x =
                    circleSize +
                    (index % items_per_row ? width / items_per_row : 0);
                  const y =
                    80 +
                    (Math.floor(index / items_per_row) * legendMy + 5) +
                    barHeight;
                  return (
                    <g id={`legend${index}`} key={`legend${index}`}>
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
