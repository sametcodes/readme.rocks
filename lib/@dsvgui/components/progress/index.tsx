import { Document, Text } from "@/lib/@dsvgui";
import { IconType } from "react-icons/lib";

export type IProgress = {
  title: string;
  percent: number;
  metrics: Array<{
    text: string;
    icon: IconType;
  }>;
};

export const Progress: React.FC<IProgress> = ({ title, percent, metrics }) => {
  const metricsOffsetX = 230;
  const metricsOffsetY = 30;

  const height = 70 + Math.ceil(metrics.length / 2) * 30;

  return (
    <Document w={462} h={height}>
      <Text x={0} y={20} option="title">
        {title}
      </Text>
      <g className="status_bar">
        <rect x="0" y="44" width={462} height="18" rx="5" fill="#E0E0E0" />
        <rect
          x="0"
          y="44"
          width={Math.floor((percent / 100) * 462)}
          height="18"
          rx="5"
          fill="#2DA44E"
        />
      </g>

      {metrics.map((metric, index) => (
        <g
          key={index}
          className="status_bar"
          transform={`translate(${index % 2 ? metricsOffsetX : 0} ${
            94 + Math.floor(index / 2) * metricsOffsetY
          })`}
        >
          <metric.icon className="icon" x={0} y={-13} size="18px" />
          <Text x={30} y={0} option="subtitle">
            {metric.text}
          </Text>
        </g>
      ))}
    </Document>
  );
};
