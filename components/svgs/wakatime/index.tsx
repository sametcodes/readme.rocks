import { Pie } from "@nivo/pie";

const pie_data = [
  {
    id: "html",
    label: "HTML",
    value: 0.0016365243074999332,
    color: "#e34c26",
  },
  {
    id: "typescript",
    label: "TypeScript",
    value: 0.002507437510267092,
    color: "#3178c6",
  },
  {
    id: "css",
    label: "CSS",
    value: 0.013580315850235575,
    color: "#563d7c",
  },
  {
    id: "javascript",
    label: "JavaScript",
    value: 0.9758251719169417,
    color: "#f1e05a",
  },
  {
    id: "python",
    label: "Python",
    value: 0.00010538453704641574,
    color: "#3572A5",
  },
  {
    id: "c++",
    label: "C++",
    value: 0.005447185199625244,
    color: "#f34b7d",
  },
  {
    id: "hlsl",
    label: "HLSL",
    value: 0.0005577548757317081,
    color: "#aace60",
  },
  {
    id: "c",
    label: "C",
    value: 0.00002017007827694111,
    color: "#555555",
  },
  {
    id: "shell",
    label: "Shell",
    value: 0.00004053251424862144,
    color: "#89e051",
  },
  {
    id: "dockerfile",
    label: "Dockerfile",
    value: 0.000003792194553430345,
    color: "#384d54",
  },
  {
    id: "solidity",
    label: "Solidity",
    value: 0.00027573101557333394,
    color: "#AA6746",
  },
];

const CenteredMetric = ({
  dataWithArc,
  centerX,
  centerY,
}: {
  dataWithArc: any;
  centerX: number;
  centerY: number;
}) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "28px",
        fontWeight: 600,
        fontFamily: "Roboto",
      }}
    >
      Languages
    </text>
  );
};

export const getAllTimeSinceToday = (result: any, platform: any) => {
  return (
    <>
      <Pie
        innerRadius={0.8}
        enableArcLabels={false}
        arcLinkLabel={(d) => `${d.id} (${d.formattedValue})`}
        layers={[
          "arcs",
          "arcLabels",
          "arcLinkLabels",
          "legends",
          CenteredMetric,
        ]}
        data={pie_data}
        width={500}
        height={500}
        valueFormat=".0%"
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={{ datum: "data.color" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "square",
          },
        ]}
      />
    </>
  );
};
