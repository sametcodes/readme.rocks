import type { Meta, StoryObj } from "@storybook/react";
import { Fallback } from "./index";

const meta: Meta<typeof Fallback> = {
  title: "Fallback",
  component: Fallback,
};
export default meta;

type Story = StoryObj<typeof Fallback>;

export const Warning: Story = {
  render: () => (
    <Fallback title="Fallback" message="This is a fallback component" />
  ),
};
