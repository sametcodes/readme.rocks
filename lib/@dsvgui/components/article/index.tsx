import { Document } from "@/lib/@dsvgui";
import { wrapText } from "@/lib/@dsvgui/utils";
import { getTextWidth } from "../../utils/index";

export type IArticle = {
  articles: {
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
  }[];
};

export const Article: React.FC<IArticle> = ({ articles }) => {
  const document_id = Math.random().toString(36).substr(2, 9);

  const inner_padding = 30;
  const thumbnail_width = 100;
  const title_width =
    Math.max(
      ...articles.map((article) =>
        getTextWidth(article.meta.title, { fontSize: 16 })
      ),
      400
    ) + 20;
  const container_width = title_width + thumbnail_width + inner_padding;

  return (
    <Document
      w={container_width}
      h={100 * articles.length}
      padding={0}
      useBranding={false}
    >
      <g clipPath="url(#clip_borders)">
        {articles.map((article, key: number) => {
          const yOffset = 100 * key;
          const xOffset = 120;

          const title = wrapText(
            article.meta.title,
            { maxLineWidth: title_width, fontSize: 16 },
            (line: string, index: number) => (
              <tspan key={index} x="0" dy={index === 0 ? 0 : 25}>
                {line}
              </tspan>
            )
          );

          return (
            <>
              {key !== 0 && (
                <line
                  x1={100}
                  y1={yOffset}
                  x2={container_width}
                  y2={yOffset}
                  stroke="#dddddd"
                />
              )}
              <g transform={`translate(0 ${yOffset})`}>
                <g transform={`translate(${xOffset} 24)`}>
                  <text
                    xmlSpace="preserve"
                    fontFamily="Manrope"
                    fontWeight="bold"
                    fill="#0c0c0c"
                    fontSize="16"
                  >
                    {title}
                  </text>
                  <text
                    fill="#999999"
                    xmlSpace="preserve"
                    fontSize={12}
                    fontFamily="Manrope"
                    y={5 + title.length * 15}
                  >
                    {wrapText(
                      article.meta.description.replace(/\n/gm, " "),
                      { maxLineWidth: title_width, fontSize: 12, maxLines: 3 },
                      (line: string, index) => (
                        <tspan key={index} x="0" dy={index === 0 ? 0 : 13}>
                          {line}
                        </tspan>
                      )
                    )}
                  </text>
                </g>

                <g transform={`translate(${xOffset} 90)`}>
                  <g transform={`translate(${15} 0)`}>
                    <g
                      transform="translate(-15 -9) scale(0.7 0.7)"
                      fill="#777777"
                    >
                      <path d="M3.5 0a0.5 0.5 0 0 1 0.5 0.5V1h8V0.5a0.5 0.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V0.5a0.5 0.5 0 0 1 0.5-0.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                      <path d="M2.5 4a0.5 0.5 0 0 1 0.5-0.5h10a0.5 0.5 0 0 1 0.5 0.5v1a0.5 0.5 0 0 1-0.5 0.5H3a0.5 0.5 0 0 1-0.5-0.5V4z" />
                    </g>
                    <text fill="#555" fontSize="12" x="3" y="1">
                      {article.publish_date}
                    </text>
                  </g>
                  <g transform={`translate(${15 + title_width / 4} 0)`}>
                    <g
                      transform="translate(-15 -9) scale(0.7 0.7)"
                      fill="#777777"
                    >
                      <path d="M11.1 0.6c-0.6 0-1.3 0.1-2 0.4l0 0 0 0c-0.4 0.2-0.8 0.5-1.1 0.8-1.8-1.5-4.6-1.7-6.6 0.1l0 0 0 0C-0.3 3.7-0.3 6.5 0.7 8.6l0 0.1 0 0c1.2 2.2 3.5 4.1 5.5 5.7l0 0 0.1 0c0.1 0.1 0.4 0.3 0.6 0.5 0.3 0.2 0.6 0.4 1 0.5l0.1 0 0.1 0c0.5 0 0.6-0.2 0.9-0.4 0.3-0.2 0.6-0.4 1-0.7 0.7-0.5 1.4-1.1 1.8-1.5 0 0 0 0 0-0.1 0 0 0 0 0 0 1-0.8 1.9-1.8 2.7-2.8 0 0 0 0 0 0 0 0 0 0 0 0 1.3-1.7 1.9-4 1.2-6.4l0 0 0-0.1C14.8 1.7 13 0.6 11.1 0.6z m0 1.4c1.4 0 2.6 0.7 3.2 2 0.6 1.8 0.1 3.6-0.9 5l0 0 0 0c-0.7 1-1.6 1.9-2.5 2.7l-0.1 0 0 0c-0.4 0.4-1.1 1-1.7 1.5-0.3 0.2-0.6 0.5-0.9 0.6-0.1 0.1-0.2 0.1-0.2 0.1-0.1 0-0.2-0.1-0.3-0.2-0.2-0.1-0.4-0.3-0.6-0.5 0 0 0 0 0 0-2-1.5-4.1-3.4-5.1-5.2-0.8-1.7-0.8-3.8 0.4-5 1.6-1.4 3.9-1.1 5 0.3l0.6 0.7 0.6-0.7c0.3-0.4 0.7-0.7 1.1-1 0.5-0.2 1-0.3 1.4-0.3z" />
                    </g>
                    <text fill="#555" fontSize="12" x="3" y="1">
                      {article.like_count} likes
                    </text>
                  </g>
                  <g transform={`translate(${15 + title_width / 2} 0)`}>
                    <g
                      transform="translate(-15 -10) scale(0.75 0.75)"
                      fill="#777777"
                    >
                      <path d="M8.5 5.6a0.5 0.5 0 1 0-1 0v2.9h-3a0.5 0.5 0 0 0 0 1H8a0.5 0.5 0 0 0 0.5-0.5V5.6z" />
                      <path d="M6.5 1A0.5 0.5 0 0 1 7 0.5h2a0.5 0.5 0 0 1 0 1v0.6c1.4 0.2 2.6 0.8 3.6 1.6a0.7 0.7 0 0 1 0 0l0.3-0.4-0.3-0.3a0.5 0.5 0 0 1 0.7-0.7l1.4 1.4a0.5 0.5 0 1 1-0.7 0.7l-0.3-0.4-0.4 0.4a0.5 0.5 0 0 1 0 0A7 7 0 1 1 7 2.1V1.5a0.5 0.5 0 0 1-0.5-0.5zM8 3a6 6 0 1 0 0 12A6 6 0 0 0 8 3z" />
                    </g>
                    <text fill="#555" fontSize="12" x="3" y="1">
                      {article.reading_time_minutes} mins
                    </text>
                  </g>
                  <g transform={`translate(${15 + (title_width / 4) * 3} 0)`}>
                    <g
                      transform="translate(-15 -10) scale(0.75 0.75)"
                      fill="#777777"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0z m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z m-1 0c0-0.2-0.2-1-0.8-1.7C11.5 10.7 10.3 10 8 10c-2.3 0-3.5 0.7-4.2 1.3-0.7 0.7-0.8 1.4-0.8 1.7h10z" />
                    </g>
                    <text fill="#555" fontSize="12" x="3" y="1">
                      {article.meta.author}
                    </text>
                  </g>
                </g>

                <g clipPath={`url(#clip_image_${document_id}${key})`}>
                  <rect
                    width={500}
                    height={500}
                    fill={`url(#pattern_${document_id}${key})`}
                  />
                </g>
              </g>

              <defs>
                <clipPath id={`clip_image_${document_id}${key}`}>
                  <rect width={100} height={100} fill="white" />
                </clipPath>
                <pattern
                  id={`pattern_${document_id}${key}`}
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref={`#image_${document_id}${key}`}
                    transform={`matrix(0.000837427 0 0 0.000814996 -0.172454 0)`}
                  />
                </pattern>
                <image
                  id={`image_${document_id}${key}`}
                  transform={`translate(50 -130)`}
                  width={article.thumbnail.width}
                  height={500}
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref={`data:image/png;base64,${article.thumbnail.value}`}
                />
              </defs>
            </>
          );
        })}
      </g>

      <defs>
        <clipPath id="clip_borders">
          <rect
            width={container_width}
            height={100 * articles.length}
            rx="20"
            fill="white"
          />
        </clipPath>
      </defs>
    </Document>
  );
};
