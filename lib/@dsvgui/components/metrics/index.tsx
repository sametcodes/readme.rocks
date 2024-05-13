import React, { Fragment } from "react";

import { Document, getDocumentSize } from "../../document";
import { Text } from "../../document/text";
import { IconType } from "react-icons/lib";
import { DocumentMeta } from "../../document/type";

export type IMetrics = {
  icon: IconType;
  data: Array<{
    title: string;
    value: number | string;
  }>;
} & DocumentMeta;

export const metricsDocumentPreferences = {
  minH: 1,
  maxH: 1,
  minW: 2,
  maxW: 5,
  default: {
    w: 4,
    h: 1,
  },
};

export const Metrics: React.FC<IMetrics> = ({ data, document, icon: Icon }) => {
  document = document || { h: 1, w: data.length + 1 };

  const { width, height } = getDocumentSize(document);
  let initialPadding = 20;
  const padding = (width - 45 - 20) / data.length;

  return (
    <Document w={width} h={height}>
      <Icon x={0} y={5} size={38} className="icon" />
      <g transform={`translate(${45} 0)`}>
        {data.map((item, index) => {
          const xText = initialPadding;
          initialPadding += padding;

          const xLine = xText - 10;

          return (
            <Fragment key={index}>
              <Text x={xText} y={height / 2 - 25} option="subtitle">
                {item.title}
              </Text>
              <Text x={xText} y={height / 2} option={{ size: 22, weight: 700 }}>
                {item.value.toString()}
              </Text>
              {index !== 0 && (
                <line x1={xLine} y1={2} x2={xLine} y2={45} stroke="#E3E3E3" />
              )}
            </Fragment>
          );
        })}
      </g>
    </Document>
  );
};
