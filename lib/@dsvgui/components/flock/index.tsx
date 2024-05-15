import React from "react";

import { Document, getDocumentSize, Text } from "../../document";
import { DocumentMeta } from "../../document/type";

export type IFlock = {
  title?: string;
  subtitle?: string;
  members: Array<{
    image: {
      value: string;
      width: number;
      height: number;
    };
    caption: string;
  }>;
} & DocumentMeta;

export const flockDocumentPreferences = {
  minW: 3,
  minH: 1,
  maxW: 8,
  maxH: 8,
  default: {
    w: 4,
    h: 2,
  },
};

export const Flock: React.FC<IFlock> = ({
  document,
  title,
  subtitle,
  members,
}) => {
  document = document || flockDocumentPreferences.default;
  const { height, width } = getDocumentSize(document);
  const isCompact = document.h === 1;

  title = isCompact ? "" : title;
  subtitle = isCompact ? "" : subtitle;

  const circleSize = 45;
  const circleGap = 5;

  const titleFontSize = title ? 22 : 0;
  const subtitleFontSize = subtitle ? 16 : 0;

  const headStart = { x: 0, y: isCompact ? 0 : 20 };
  const boxStart = {
    x: circleSize / 2,
    y: headStart.y + titleFontSize + subtitleFontSize + circleSize / 2,
  };

  const itemsPerRow = Math.floor(width / (circleSize + circleGap));

  members = members.slice(
    0,
    itemsPerRow * Math.floor((height - boxStart.y) / (circleSize + circleGap))
  );

  const documentId = Math.random().toString(36).substr(2, 9);
  return (
    <Document w={width} h={height}>
      {title && (
        <Text x={headStart.x} y={headStart.y} option="title">
          {title.trim()}
        </Text>
      )}
      {subtitle && (
        <Text x={headStart.x} y={headStart.y + 22} option="subtitle">
          {subtitle.trim()}
        </Text>
      )}
      {members.map((member, index) => {
        const row = Math.floor(index / itemsPerRow);
        const col = index % itemsPerRow;

        return (
          <>
            <circle
              xmlns="http://www.w3.org/2000/svg"
              className="border"
              cx={boxStart.x + col * (circleSize + circleGap)}
              cy={boxStart.y + row * (circleSize + circleGap)}
              r={circleSize / 2}
              fill={`url(#member${documentId}${index})`}
              stroke="#ddd"
            />
            <defs>
              <pattern
                xmlns="http://www.w3.org/2000/svg"
                id={`member${documentId}${index}`}
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref={`#image${documentId}${index}`}
                  transform="scale(0.00217391)"
                />
              </pattern>
              <image
                xmlns="http://www.w3.org/2000/svg"
                id={`image${documentId}${index}`}
                width="460"
                height="460"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref={`data:image/png;base64,${member.image.value.replace(
                  "data:image/png;base64,",
                  ""
                )}`}
              />
            </defs>
          </>
        );
      })}
    </Document>
  );
};
