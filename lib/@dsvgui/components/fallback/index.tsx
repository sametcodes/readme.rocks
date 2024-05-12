import React from "react";

import { Document, Text, getDocumentSize } from "../../document";
import { wrapText } from "../../utils";
import { IoWarningOutline } from "react-icons/io5";
import { DocumentMeta } from "../../document/type";

export type IFallback = {
  title: string;
  message: string;
} & DocumentMeta;

export const documentPreferences = {
  minW: 3,
  minH: 1,
  maxW: 4,
  maxH: 1,
  default: {
    w: 3,
    h: 1,
  },
};

export const Fallback: React.FC<IFallback> = ({ title, message, document }) => {
  document = document || documentPreferences.default;
  const { height, width } = getDocumentSize(document);

  const subtitle = wrapText(
    message,
    { maxLineWidth: width - 60, fontSize: 14, fontWeight: 500 },
    (line, index) => (
      <Text x={67} y={index * 16 + 40} option={{ size: 14, weight: 500 }}>
        {line}
      </Text>
    )
  );

  return (
    <Document w={width} h={height}>
      <IoWarningOutline
        stroke="#646464"
        fill="#646464"
        className="icon"
        size="45px"
      />
      <Text x={67} y={20} option="title">
        {title}
      </Text>
      {subtitle}
    </Document>
  );
};
