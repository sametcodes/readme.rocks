import { ReactRenderer } from "@storybook/react";
import { StoryAnnotations } from "@storybook/types";
import { useState } from "react";

import GridLayout from "react-grid-layout";
import { DocumentMeta } from "../document/type";

export const Grid = <T extends DocumentMeta>({
  component: Component,
  stories,
}: {
  component: React.FC<T>;
  stories: Array<StoryAnnotations<ReactRenderer, T, Partial<T>>>;
}) => {
  const componentSizes: Array<GridLayout.Layout> = stories.map((story, i) => {
    const { document } = story.args as T;
    return {
      ...(document || { w: 4, h: 2 }),
      x: 0,
      y: stories
        .slice(0, i)
        .reduce(
          (acc, c) =>
            acc + ((c.args as T).document as { w: number; h: number }).h,
          0
        ),
      i: i.toString(),
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
      {stories.map((story, i) => {
        const document = layout[i];
        return (
          <div key={i}>
            <Component {...(story.args as T)} document={document} />
          </div>
        );
      })}
    </GridLayout>
  );
};
