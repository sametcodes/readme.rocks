"use client";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";

const ResponsiveGridLayout = WidthProvider(Responsive);

type RocksGridBuilderProps = {
  rocks: Array<JSX.Element>;
};

export function RocksGridBuilder({ rocks }: RocksGridBuilderProps) {
  // const layout: Array<Layout> = [];

  function onBreakpointChange(newBreakpoint: string, newCols: number) {
    console.log({ newBreakpoint, newCols });
  }

  const addPlaceholder = useMemo(
    () => (
      <div
        key={"grid_0"}
        data-grid={{
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          isResizable: false,
        }}
      >
        <div className="flex flex-col justify-center items-center text-center border-gray-300 border">
          <FaPlus className="text-2xl" color="#555555" fontWeight="300" />
          <p>Add a widget</p>
        </div>
      </div>
    ),
    []
  );

  return (
    <ResponsiveGridLayout
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      onBreakpointChange={onBreakpointChange}
      rowHeight={30}
      autoSize={true}
    >
      {addPlaceholder}
      {rocks.map((rock, index) => {
        return (
          <div
            key={index}
            data-grid={{
              x: 0,
              y: 0,
              w: rock.props.width / 30 / 4,
              h: rock.props.height / 30,
              isResizable: false,
            }}
          >
            {rock}
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
}
