import { Document } from "@/lib/@dsvgui";

export type IProgress = {
  title: string;
  percent: number;
  metrics: {
    text: string;
    icon: JSX.Element;
  }[];
};

export const Progress: React.FC<IProgress> = ({ title, percent, metrics }) => {
  const metrics_x_offset = 230;
  const metrics_y_offset = 30;

  const height = 105 + Math.ceil(metrics.length / 2) * 30;

  return (
    <Document w={500} h={height} padding={10}>
      <text fill="#5E5E5E">
        <tspan x="17" y="40.7539" fontWeight={700} fontSize={25}>
          {title}
        </tspan>
      </text>
      <g className="status_bar">
        <rect x="17" y="64" width={462} height="18" rx="5" fill="#E7E7E7" />
        <rect
          x="17"
          y="64"
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
          transform={`translate(${20 + (index % 2 ? metrics_x_offset : 0)} ${
            114 + Math.floor(index / 2) * metrics_y_offset
          })`}
        >
          {metric.icon}
          <text fill="#636363">
            <tspan x="30" y="0" fontSize={17} fontWeight="300">
              {metric.text}
            </tspan>
          </text>
        </g>
      ))}
    </Document>
  );
};
