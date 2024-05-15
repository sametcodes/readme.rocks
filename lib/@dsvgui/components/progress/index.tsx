import React from "react";

import { Document, Text } from "../../document";
import { IconType } from "react-icons/lib";
import { DocumentMeta } from "../../document/type";
import { getDocumentSize } from "../../document/document";

export type IProgress = {
  title: string;
  percent: number;
  metrics: Array<{
    text: string;
    icon: IconType;
  }>;
} & DocumentMeta;

export const progressDocumentPreferences = {
  minW: 3,
  minH: 1,
  maxW: 5,
  maxH: 2,
  default: {
    w: 5,
    h: 2,
  },
};

export const Progress: React.FC<IProgress> = ({
  title,
  percent,
  metrics,
  document,
}) => {
  document = document || progressDocumentPreferences.default;
  const { height, width } = getDocumentSize(document);

  const metricsOffsetX = width / 2 - 20;
  const metricsOffsetY = 30;

  const showLabels = document.h > 1;
  const showAllLabels = document.w > 3;

  return (
    <Document w={width} h={height}>
      <Text x={0} y={showLabels ? 20 : 15} option="title">
        {title}
      </Text>
      <g className="status_bar">
        <rect
          x="0"
          y={showLabels ? 45 : 30}
          width={width - metricsOffsetY * 2}
          height={showLabels ? 18 : 12}
          rx="5"
          fill="#E0E0E0"
        />
        <rect
          x="0"
          y={showLabels ? 45 : 30}
          width={Math.floor((percent / 100) * (width - metricsOffsetY * 2))}
          height={showLabels ? 18 : 12}
          rx="5"
          fill="#2DA44E"
        />
      </g>

      {(showLabels &&
        metrics.map((metric, index) => {
          if (!showAllLabels && index > 1) return <></>;
          const horizontalSplit = `translate(${
            index % 2 ? metricsOffsetX : 0
          } ${105 + Math.floor(index / 2) * metricsOffsetY})`;
          const verticalSplit = `translate(0 ${
            105 + Math.floor(index) * metricsOffsetY
          })`;

          return (
            <g
              key={index}
              className="status_bar"
              transform={showAllLabels ? horizontalSplit : verticalSplit}
            >
              <metric.icon className="icon" x={0} y={-13} size="18px" />
              <Text x={30} y={0} option="subtitle">
                {metric.text}
              </Text>
            </g>
          );
        })) ||
        ""}
    </Document>
  );
};
