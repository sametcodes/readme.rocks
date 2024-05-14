import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "../../utils/grid";
import { documentPreferences, Placeholder } from "./index";

const meta: Meta<typeof Placeholder> = {
  title: "Placeholder",
  component: Placeholder,
};
export default meta;

type Story = StoryObj<typeof Placeholder>;

export const Size1x1: Story = {
  args: {
    document: {
      w: 1,
      h: 1,
      ...documentPreferences,
    },
  },
  loaders: [],
};

export const Size2x1: Story = {
  args: {
    document: {
      w: 2,
      h: 1,
      ...documentPreferences,
    },
  },
  loaders: [],
};

export const Size1x2: Story = {
  args: {
    document: {
      w: 1,
      h: 2,
      ...documentPreferences,
    },
  },
  loaders: [],
};

export const Size2x2: Story = {
  args: {
    document: {
      w: 2,
      h: 2,
      ...documentPreferences,
    },
  },
  loaders: [],
};

export const Size3x2: Story = {
  args: {
    document: {
      w: 3,
      h: 2,
      ...documentPreferences,
    },
  },
  loaders: [],
};

export const Size2x3: Story = {
  args: {
    document: {
      w: 2,
      h: 3,
      ...documentPreferences,
    },
  },
  loaders: [],
};

export const Size3x3: Story = {
  args: {
    document: {
      w: 3,
      h: 3,
      ...documentPreferences,
    },
  },
  loaders: [],
};

export const WithGrid = () => {
  return (
    <Grid
      component={Placeholder}
      stories={[Size1x1, Size2x1, Size1x2, Size2x2, Size3x2, Size2x3, Size3x3]}
    />
  );
};
