import type { Meta, StoryObj } from "@storybook/react";
import { Article } from "./index";

const meta: Meta<typeof Article> = {
  title: "Article",
  component: Article,
};
export default meta;

type Story = StoryObj<typeof Article>;

export const Base: Story = {
  args: {
    articles: [
      {
        meta: {
          title: "Why JS?",
          description: "I can't imagine a word without Javascript.",
          author: "sametcodes",
        },
        thumbnail: {
          value: "",
          width: 20,
          height: 20,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
    ],
  },
};
