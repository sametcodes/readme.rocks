import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Flock, IFlock, flockDocumentPreferences } from "./index";
import { readImageURL } from "../../utils";
import { Grid } from "../grid";
import { getGridComponents } from "../../utils/index";
import { encodedPlaceholder } from "../../utils/encoded";

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

const imageLoader = async ({ args }: { args: IFlock }) => {
  const images = await Promise.all(
    args.members.map((member) => readImageURL(member.image.value))
  );
  return { images };
};

type Story = StoryObj<IFlock>;

const produceMockImages = (n: number, width: number, height: number) => {
  return Array.from({ length: n }).map((_, key) => ({
    image: {
      value: encodedPlaceholder,
      width,
      height,
    },
    caption: `Member ${key + 1}`,
  }));
};

export const Base: Story = {
  args: {
    document: {
      w: 4,
      h: 1,
      ...flockDocumentPreferences,
    },
    title: "Flock",
    subtitle: "This is a flock component",
    members: produceMockImages(200, 5, 5),
  },
  loaders: [imageLoader],
};

export const WithText: Story = {
  args: {
    document: {
      w: 4,
      h: 2,
      ...flockDocumentPreferences,
    },
    title: "Flock",
    subtitle: "This is a flock component",
    members: produceMockImages(200, 5, 5),
  },
  loaders: [imageLoader],
};

const rocks = getGridComponents([Base, WithText], Flock);
export const WithGrid = () => {
  return <Grid rocks={rocks} />;
};
