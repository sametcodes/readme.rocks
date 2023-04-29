import React from "react";
import { Document, Text } from "@/lib/@dsvgui";
import { wrapText } from "@/lib/@dsvgui/utils/index";
import { IoWarningOutline } from "react-icons/io5";

type IFallback = {
  title: string;
  message: string;
};

export const Fallback: React.FC<IFallback> = ({ title, message }) => {
  const width = 450;

  const subtitle = wrapText(
    message,
    { maxLineWidth: width - 60, fontSize: 14, fontWeight: 400 },
    (line, index) => (
      <Text x={67} y={index * 16 + 40} option={{ size: 14, weight: 400 }}>
        {line}
      </Text>
    )
  );

  const height = 25 + subtitle.length * 16;

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
