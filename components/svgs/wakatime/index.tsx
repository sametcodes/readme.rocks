import { Pie } from "@nivo/pie";

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
  console.log({ result });
  // return (
  //   <>
  //     <Pie
  //       innerRadius={0.8}
  //       enableArcLabels={false}
  //       arcLinkLabel={(d: any) => `${d.id} (${d.formattedValue})`}
  //       layers={[
  //         "arcs",
  //         "arcLabels",
  //         "arcLinkLabels",
  //         "legends",
  //         CenteredMetric,
  //       ]}
  //       data={pie_data}
  //       width={500}
  //       height={500}
  //       valueFormat=".0%"
  //       margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
  //       padAngle={0.7}
  //       cornerRadius={3}
  //       activeOuterRadiusOffset={8}
  //       borderWidth={1}
  //       colors={{ datum: "data.color" }}
  //       borderColor={{
  //         from: "color",
  //         modifiers: [["darker", 0.2]],
  //       }}
  //       arcLinkLabelsSkipAngle={10}
  //       arcLinkLabelsTextColor="#333333"
  //       arcLinkLabelsThickness={2}
  //       arcLinkLabelsColor={{ from: "color" }}
  //       arcLabelsSkipAngle={10}
  //       arcLabelsTextColor={{
  //         from: "color",
  //         modifiers: [["darker", 2]],
  //       }}
  //       legends={[
  //         {
  //           anchor: "bottom",
  //           direction: "row",
  //           justify: false,
  //           translateX: 0,
  //           translateY: 56,
  //           itemsSpacing: 0,
  //           itemWidth: 100,
  //           itemHeight: 18,
  //           itemTextColor: "#999",
  //           itemDirection: "left-to-right",
  //           itemOpacity: 1,
  //           symbolSize: 18,
  //           symbolShape: "square",
  //         },
  //       ]}
  //     />
  //   </>
  // );
};
