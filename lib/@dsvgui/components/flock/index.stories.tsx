import type { Meta, StoryObj } from "@storybook/react";
import { Flock } from "./index";
import { readImageURL } from "@/lib/@dsvgui/utils";

const meta: Meta<typeof Flock> = {
  title: "Flock",
  component: Flock,
  render: ({ members, ...args }, { loaded }) => {
    members = members.map((member, key) => ({
      ...member,
      image: loaded.images[key],
    }));

    return <Flock members={members} {...args} />;
  },
};
export default meta;

type Story = StoryObj<typeof Flock>;

const produceMockImages = (n: number, width: number, height: number) => {
  return Array.from({ length: n }).map((_, key) => ({
    image: {
      value: "https://picsum.photos/300/300",
      width,
      height,
    },
    caption: `Member ${key + 1}`,
  }));
};

export const Base: Story = {
  args: {
    title: "Flock",
    subtitle: "This is a flock component",
    items_per_row: 5,
    members: produceMockImages(4, 150, 150),
  },
  loaders: [
    async ({ args }) => {
      const images = await Promise.all(
        args.members.map((member) => readImageURL(member.image.value))
      );
      return { images };
    },
  ],
};
