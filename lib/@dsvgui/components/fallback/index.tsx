import React from "react";
import { Document } from "@/lib/@dsvgui";
import { wrapText } from "../../utils/index";

type IFallback = {
  title: string;
  message: string;
};

export const Fallback: React.FC<IFallback> = ({ title, message }) => {
  const width = 450;

  return (
    <Document w={width} h={110} padding={10}>
      <path
        className="icon"
        xmlns="http://www.w3.org/2000/svg"
        d="M52.95 36.3464C52.3 34.9719 49.9167 34.9719 49.0501 36.3464L29.55 69.7266C29.3564 70.03 29.256 70.3748 29.2591 70.7253C29.2622 71.0758 29.3688 71.4192 29.5678 71.7197C29.7668 72.0203 30.0509 72.2671 30.3907 72.4345C30.7305 72.6019 31.1135 72.6839 31.5 72.6719H70.5001C70.8866 72.6839 71.2696 72.6019 71.6094 72.4345C71.9492 72.2671 72.2333 72.0203 72.4323 71.7197C72.6313 71.4192 72.7379 71.0758 72.741 70.7253C72.7441 70.3748 72.6437 70.03 72.4501 69.7266L52.95 36.3464ZM53.1667 66.7812H48.8334V62.8542H53.1667V66.7812ZM48.8334 58.9271V49.1094H53.1667V58.9271H48.8334Z"
        fill="#646464"
      />
      <text
        fill="#646464"
        xmlSpace="preserve"
        fontFamily="Manrope"
        fontSize="22"
        fontWeight="bold"
        letterSpacing="0.1px"
      >
        <tspan x="87" y="48.426">
          {title}
        </tspan>
      </text>
      <text
        fill="#646464"
        xmlSpace="preserve"
        fontFamily="Manrope"
        fontSize="12"
        fontWeight="400"
        letterSpacing="0.1px"
      >
        {wrapText(
          message,
          { maxLineWidth: width - 100, fontSize: 12 },
          (line, index) => (
            <tspan key={index} x="87" y={index * 18 + 68.713}>
              {line}
            </tspan>
          )
        )}
      </text>
    </Document>
  );
};
