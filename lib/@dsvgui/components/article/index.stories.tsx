import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Article, articleDocumentPreferences, IArticle } from "./index";
import { readImageURL } from "../../utils";
import { Grid } from "../../utils/grid";

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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uJ_UDNhq--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h2q16fucjwb4cla0ho05.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--r3He9vYK--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fuc2yb3yi1680dgmfj25.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--Wzj_6u7j--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/53d24e36pofszh6shj6t.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--_hLjVEgA--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ewoetr6z83in1o5iu5uc.png",
          width: 150,
          height: 150,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
    ],
  },
  loaders: [
    async ({ args: { articles } }) => {
      const thumbnails = await Promise.all(
        articles.map((article) => readImageURL(article.thumbnail.value))
      );
      return { thumbnails };
    },
  ],
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uJ_UDNhq--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h2q16fucjwb4cla0ho05.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--r3He9vYK--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fuc2yb3yi1680dgmfj25.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--Wzj_6u7j--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/53d24e36pofszh6shj6t.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--_hLjVEgA--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ewoetr6z83in1o5iu5uc.png",
          width: 150,
          height: 150,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
    ],
  },
  loaders: [
    async ({ args: { articles } }) => {
      const thumbnails = await Promise.all(
        articles.map((article) => readImageURL(article.thumbnail.value))
      );
      return { thumbnails };
    },
  ],
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uJ_UDNhq--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h2q16fucjwb4cla0ho05.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--r3He9vYK--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fuc2yb3yi1680dgmfj25.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--Wzj_6u7j--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/53d24e36pofszh6shj6t.png",
          width: 150,
          height: 150,
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
          value:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--_hLjVEgA--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ewoetr6z83in1o5iu5uc.png",
          width: 150,
          height: 150,
        },
        publish_date: "20.03.2023",
        like_count: 3,
        reading_time_minutes: 4,
      },
    ],
  },
  loaders: [
    async ({ args: { articles } }) => {
      const thumbnails = await Promise.all(
        articles.map((article) => readImageURL(article.thumbnail.value))
      );
      return { thumbnails };
    },
  ],
};

export const WithGrid = () => {
  return <Grid component={Article} stories={[Base, Compact, WithoutImage]} />;
};
