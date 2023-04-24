import React from "react";
import { Document } from "@/lib/@dsvgui";
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
      <tspan key={index} x="67" y={index * 16 + 40}>
        {line}
      </tspan>
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
      <text
        fill="#3e3e3e"
        xmlSpace="preserve"
        fontFamily="Manrope"
        fontSize="22"
        fontWeight="bold"
        letterSpacing="0.1px"
      >
        <tspan x="67" y="20">
          {title}
        </tspan>
      </text>
      <text
        fill="#6e6e6e"
        xmlSpace="preserve"
        fontFamily="Manrope"
        fontSize="14"
        fontWeight="400"
      >
        {subtitle}
      </text>
    </Document>
  );
};
