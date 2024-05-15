import React from "react";

import { Document, Text, getDocumentSize } from "../../document";
import { wrapText, getTextWidth, truncateText } from "../../utils";

import { AiOutlineCalendar, AiOutlineLike } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";

import { DocumentMeta } from "../../document/type";

export type IArticle = {
  articles: Array<{
    meta: {
      title: string;
      description: string;
      author: string;
    };
    thumbnail: {
      value: string;
      width: number;
      height: number;
    };
    publish_date: string;
    like_count: number;
    reading_time_minutes: number;
  }>;
} & DocumentMeta;

export const articleDocumentPreferences = {
  minW: 3,
  minH: 1,
  maxW: 5,
  maxH: 4,
  default: {
    w: 5,
    h: 3,
  },
};

export const Article: React.FC<IArticle> = ({ articles, document }) => {
  document = document || articleDocumentPreferences.default;
  const { width, height } = getDocumentSize(document);

  const withImage = document.w > 4;
  const documentId = Math.random().toString(36).substr(2, 9);

  const rowHeight = height / articles.length;
  const innerPadding = 30;
  const thumbnailWidth = withImage ? 100 : 0;
  const titleWidth = width - thumbnailWidth - innerPadding;
  const containerWidth = titleWidth + thumbnailWidth + innerPadding;

  return (
    <Document w={width} h={height} padding={0} useBranding={false}>
      <g clipPath="url(#clip_borders)">
        {articles.map((article, key: number) => {
          const yOffset = rowHeight * key;
          const xOffset = thumbnailWidth + 20;

          const titleTextWidth = getTextWidth(article.meta.title, {
            fontSize: 16,
            fontWeight: 700,
          });
          const title = (
            <Text x={0} y={0} option={{ size: 16, weight: 700 }}>
              {truncateText(
                article.meta.title,
                (titleWidth / titleTextWidth) * (article.meta.title.length - 5)
              )}
            </Text>
          );

          return (
            <>
              {key !== 0 && (
                <line
                  key={`line_${key}`}
                  x1={thumbnailWidth}
                  y1={yOffset}
                  x2={containerWidth}
                  y2={yOffset}
                  className="divider"
                  stroke="#dddddd"
                />
              )}
              <g transform={`translate(0 ${yOffset})`} key={`group_${key}`}>
                <g transform={`translate(${xOffset} 25)`}>
                  {title}
                  {wrapText(
                    article.meta.description.replace(/\n/gm, " "),
                    {
                      maxLineWidth: titleWidth - 20,
                      fontSize: 12,
                      maxLines: 2,
                    },
                    (line: string, index) => (
                      <Text
                        x={0}
                        y={18 + index * 13}
                        option={{ size: 12, weight: 500 }}
                        className="subtitle"
                      >
                        {line}
                      </Text>
                    )
                  )}
                </g>

                <g transform={`translate(${xOffset} 80)`}>
                  <g transform={`translate(${15} 0)`}>
                    <AiOutlineCalendar
                      className="icon"
                      x={-18}
                      y={-11}
                      fontSize="15px"
                    />
                    <Text x={3} y={1} option={{ size: 12, weight: 500 }}>
                      {article.publish_date}
                    </Text>
                  </g>
                  {(document?.w || articleDocumentPreferences.default.w) >
                    3 && (
                    <>
                      <g transform={`translate(${30 + titleWidth / 4} 0)`}>
                        <AiOutlineLike
                          className="icon"
                          x={-18}
                          y={-11}
                          fontSize="15px"
                        />
                        <Text x={3} y={1} option={{ size: 12, weight: 500 }}>
                          {article.like_count}
                        </Text>
                      </g>
                      <g transform={`translate(${15 + titleWidth / 2} 0)`}>
                        <BiTimeFive
                          className="icon"
                          x={-18}
                          y={-11}
                          fontSize="15px"
                        />
                        <Text x={3} y={1} option={{ size: 12, weight: 500 }}>
                          {article.reading_time_minutes}
                        </Text>
                      </g>
                    </>
                  )}
                  <g
                    transform={`translate(${
                      0 +
                      (titleWidth / 4) * 3 -
                      ((document?.w || articleDocumentPreferences.default.w) <=
                      3
                        ? 30
                        : 0)
                    } 0)`}
                  >
                    <IoPersonCircleOutline
                      className="icon"
                      x={-18}
                      y={-11}
                      fontSize="15px"
                    />
                    <Text x={3} y={1} option={{ size: 12, weight: 500 }}>
                      {article.meta.author}
                    </Text>
                  </g>
                </g>

                <g clipPath={`url(#clip_image_${documentId}${key})`}>
                  <rect
                    width={500}
                    height={500}
                    fill={`url(#pattern_${documentId}${key})`}
                  />
                </g>
              </g>

              {withImage && (
                <defs key={`def_${key}`}>
                  <clipPath id={`clip_image_${documentId}${key}`}>
                    <rect width={rowHeight} height={rowHeight} fill="white" />
                  </clipPath>
                  <pattern
                    id={`pattern_${documentId}${key}`}
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref={`#image_${documentId}${key}`}
                      transform={`matrix(0.000837427 0 0 0.000814996 -0.172454 0)`}
                    />
                  </pattern>
                  <image
                    id={`image_${documentId}${key}`}
                    transform={`translate(50 -130)`}
                    width={article.thumbnail.width}
                    height={500}
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref={`data:image/png;base64,${article.thumbnail.value}`}
                  />
                </defs>
              )}
            </>
          );
        })}
      </g>

      <defs>
        <clipPath id="clip_borders">
          <rect width={containerWidth} height={height} rx="20" fill="white" />
        </clipPath>
      </defs>
    </Document>
  );
};
