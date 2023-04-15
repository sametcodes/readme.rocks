import type { Meta, StoryObj } from "@storybook/react";
import { Flock } from "./index";

const meta: Meta<typeof Flock> = {
  title: "Flock",
  component: Flock,
};
export default meta;

type Story = StoryObj<typeof Flock>;

export const Base: Story = {
  args: {
    title: "Flock",
    subtitle: "This is a flock component",
    items_per_row: 2,
    members: [
      {
        image: {
          value: "",
          width: 20,
          height: 20,
        },
        caption: "",
      },
    ],
  },
};
