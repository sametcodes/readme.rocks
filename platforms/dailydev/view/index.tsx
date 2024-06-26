import { ViewComponent } from "@/platforms/types";
import { Article, IArticle } from "@/lib/@dsvgui";
import { convertDateToReadableFormat } from "@/lib/@dsvgui/utils";
import getImageSize from "image-size";

export const listArticles: ViewComponent = async (result, config) => {
  const promisedThumbnails = result.data.page.edges.map(
    async (article: any, key: number) => {
      const response = await fetch(article.node.image);
      const arrayBuffer = await response.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);
      const imageData = getImageSize(buffer);

      return {
        value: buffer.toString("base64"),
        width: imageData.width,
        height: imageData.height,
      };
    }
  );
  const thumbnails = await Promise.all(promisedThumbnails);

  const articles: IArticle["articles"] = result.data.page.edges.map(
    (article: any, key: number) => {
      return {
        meta: {
          title: article.node.title,
          description: article.node.description,
          author: article.node.source.handle,
        },
        thumbnail: thumbnails[key],
        publish_date: convertDateToReadableFormat(article.node.createdAt),
        like_count: article.node.numUpvotes,
        reading_time_minutes: article.node.readTime,
      };
    }
  );

  return (
    <Article document={{ w: 5, h: articles.length }} articles={articles} />
  );
};
