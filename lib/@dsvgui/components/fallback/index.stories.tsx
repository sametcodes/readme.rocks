import type { Meta, StoryObj } from "@storybook/react";
import { getGridComponents } from "../../utils";
import { Grid } from "../grid";
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

const rocks = getGridComponents([Base], Fallback);
export const WithGrid = () => {
  return <Grid rocks={rocks} />;
};
