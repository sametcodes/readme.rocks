import { Document } from "@/lib/@dsvgui";

export type IProgress = {
  title: string;
  percent: number;
  metrics: Array<{
    text: string;
    icon: JSX.Element;
  }>;
};

export const Progress: React.FC<IProgress> = ({ title, percent, metrics }) => {
  const metricsOffsetX = 230;
  const metricsOffsetY = 30;

  const height = 70 + Math.ceil(metrics.length / 2) * 30;

  return (
    <Document w={462} h={height}>
      <text fill="#5E5E5E" className="title">
        <tspan x="0" y="20.7539">
          {title}
        </tspan>
      </text>
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
          {metric.icon}
          <text fill="#636363">
            <tspan x="30" y="0" className="subtitle" fontWeight="300">
              {metric.text}
            </tspan>
          </text>
        </g>
      ))}
    </Document>
  );
};
