import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "../../utils/grid";
import { Fallback, IFallback, documentPreferences } from "./index";

const meta: Meta<typeof Fallback> = {
  title: "Fallback",
  component: Fallback,
};
export default meta;

type Story = StoryObj<IFallback>;

export const Base: Story = {
  args: {
    document: {
      w: 4,
      h: 1,
      ...documentPreferences,
    },
    title: "Fallback",
    message: "This is a fallback component",
  },
};

export const WithGrid = () => {
  return <Grid component={Fallback} stories={[Base]} />;
};
