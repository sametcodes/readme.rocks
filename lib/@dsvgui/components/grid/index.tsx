import { useState } from "react";

import GridLayout from "react-grid-layout";
import { GridItem } from "../../document/type";

export const Grid = <T extends {}>({
  rocks,
}: {
  rocks: Array<GridItem<T>>;
}) => {
  const componentSizes: Array<GridLayout.Layout> = rocks.map((rock, i) => {
    const { document } = rock as GridItem<T>;
    return {
      x: 0,
      y: rocks
        .slice(0, i)
        .reduce(
          (acc, c) =>
            acc + ((c as GridItem<T>).document as { w: number; h: number }).h,
          0
        ),
      i: i.toString(),
      w: (document as { w: number; h: number }).w,
      h: (document as { w: number; h: number }).h,
    };
  }, []);

  const [layout, setLayout] =
    useState<Array<GridLayout.Layout>>(componentSizes);

  const onLayoutChange = (newLayout: Array<GridLayout.Layout>) => {
    setLayout(newLayout);
  };

  return (
    <GridLayout
      className="layout"
      rowHeight={90}
      width={1400}
      cols={14}
      margin={[10, 10]}
      containerPadding={[0, 0]}
      layout={layout}
      onLayoutChange={onLayoutChange}
    >
      {rocks.map((rock: GridItem<T>, i) => {
        const document = layout[i];
        const { document: _, component: Component, ...rest } = rock;
        return (
          <div key={i}>
            <Component {...(rest as any)} document={document} />
          </div>
        );
      })}
    </GridLayout>
  );
};
