import { ViewComponent } from "@/platforms/types";
import { Article, IArticle } from "@/lib/@dsvgui";
import getImageSize from "image-size";

export const listArticles: ViewComponent = async (result, config) => {
  const promisedThumbnails = result.map(async (article: any, key: number) => {
    const response = await fetch(article.cover_image || article.social_image);
    const arrayBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);
    const imageData = getImageSize(buffer);

    return {
      value: buffer.toString("base64"),
      width: imageData.width,
      height: imageData.height,
    };
  });
  const thumbnails = await Promise.all(promisedThumbnails);

  const articles: IArticle["articles"] = result.map(
    (article: any, key: number) => {
      return {
        meta: {
          title: article.title,
          description: article.description,
          author: article.user.username,
        },
        thumbnail: thumbnails[key],
        publish_date: article.readable_publish_date,
        like_count: article.positive_reactions_count,
        reading_time_minutes: article.reading_time_minutes,
      };
    }
  );

  return <Article articles={articles} />;
};
