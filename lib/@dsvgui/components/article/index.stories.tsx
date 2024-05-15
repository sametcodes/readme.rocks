import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Article, articleDocumentPreferences, IArticle } from "./index";
import { getGridComponents, readImageURL } from "../../utils";
import { Grid } from "../grid";
import { encodedPlaceholder } from "../../utils/encoded";

const meta: Meta<typeof Article> = {
  title: "Article",
  component: Article,
  render: ({ articles, document }, { loaded: { thumbnails } }) => {
    articles = articles.map((article, key) => ({
      ...article,
      thumbnail: thumbnails[key],
    }));

    return <Article articles={articles} document={document} />;
  },
};
export default meta;

const imageLoader = async ({ args: { articles } }: { args: IArticle }) => {
  const thumbnails = await Promise.all(
    articles.map((article) => readImageURL(article.thumbnail.value))
  );
  return { thumbnails };
};

type Story = StoryObj<IArticle>;

export const Base: Story = {
  args: {
    document: {
      w: 5,
      h: 4,
      ...articleDocumentPreferences,
    },
    articles: [
      {
        meta: {
          title: "Why JS?",
          description: "I can't imagine a word without Javascript.",
          author: "sametcodes",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 300,
          height: 300,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Why not PHP?",
          description: "I can't imagine a word with PHP.",
          author: "eminkokdemir",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 300,
          height: 300,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Go is the best",
          description: "What do and what do not do with Go.",
          author: "ekurt",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 300,
          height: 300,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Launching my TodoList App",
          description:
            "You can find the source code on my Github. I will be happy if you contribute to the project.",
          author: "aydinfz",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 300,
          height: 300,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
    ],
  },
  loaders: [imageLoader],
};

export const Compact: Story = {
  args: {
    document: {
      w: 3,
      h: 3,
      ...articleDocumentPreferences,
    },
    articles: [
      {
        meta: {
          title: "Why JS?",
          description: "I can't imagine a word without Javascript.",
          author: "sametcodes",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 400,
          height: 400,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Why not PHP?",
          description: "I can't imagine a word with PHP.",
          author: "eminkokdemir",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 400,
          height: 400,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Go is the best",
          description: "What do and what do not do with Go.",
          author: "ekurt",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 400,
          height: 400,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Launching my TodoList App",
          description:
            "You can find the source code on my Github. I will be happy if you contribute to the project.",
          author: "aydinfz",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 400,
          height: 400,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
    ],
  },
  loaders: [imageLoader],
};

export const WithoutImage: Story = {
  args: {
    document: {
      w: 4,
      h: 3,
      ...articleDocumentPreferences,
    },
    articles: [
      {
        meta: {
          title: "Why JS?",
          description: "I can't imagine a word without Javascript.",
          author: "sametcodes",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 400,
          height: 400,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Why not PHP?",
          description: "I can't imagine a word with PHP.",
          author: "eminkokdemir",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 400,
          height: 400,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Go is the best",
          description: "What do and what do not do with Go.",
          author: "ekurt",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 400,
          height: 400,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
      {
        meta: {
          title: "Launching my TodoList App",
          description:
            "You can find the source code on my Github. I will be happy if you contribute to the project.",
          author: "aydinfz",
        },
        thumbnail: {
          value: encodedPlaceholder,
          width: 400,
          height: 400,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
    ],
  },
  loaders: [imageLoader],
};

const rocks = getGridComponents([Base, Compact, WithoutImage], Article);
export const WithGrid = () => {
  return <Grid rocks={rocks} />;
};
