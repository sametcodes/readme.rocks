import { ViewComponent } from "@/platforms/types";
import { Article } from "@/lib/@dsvgui";
import { wrapText } from "@/lib/@dsvgui/utils";

export const listArticles: ViewComponent = async (result, config) => {
  const promise_images = result.data.map(async (article: any, key: number) => {
    const response = await fetch(article.cover_image || article.social_image);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString("base64");
  });

  const images = await Promise.all(promise_images);

  return (
    <Article width={398} height={110 * result.data.length}>
      <>
        <g clipPath="url(#clip0)">
          {result.data.map((article: any, key: number) => {
            const yOffset = 110 * key;

            const title = wrapText(
              article.title,
              { maxLineWidth: 260, fontSize: 12 },
              (line: string, index) => (
                <tspan key={index} x="0" dy={index === 0 ? 0 : 15}>
                  {line}
                </tspan>
              )
            );

            return (
              <>
                <g transform={`translate(0 ${yOffset})`}>
                  <g clipPath={`url(#clip_image_${key})`}>
                    <rect
                      width="400"
                      height="400"
                      transform="translate(0 0)"
                      fill={`url(#pattern_${key})`}
                    />
                  </g>
                  <g transform={`translate(119 24)`}>
                    <text
                      fill="#0C0C0C"
                      xmlSpace="preserve"
                      fontFamily="Manrope"
                      fontSize="12"
                      fontWeight="bold"
                      letterSpacing="0.1px"
                    >
                      {title}
                    </text>
                    <text
                      fill="#777777"
                      xmlSpace="preserve"
                      fontFamily="Manrope"
                      fontSize="10"
                      letterSpacing="0.1px"
                      x="0"
                      y={5 + title.length * 15}
                    >
                      {wrapText(
                        article.description,
                        { maxLineWidth: 260, fontSize: 10 },
                        (line: string, index) => (
                          <tspan key={index} x="0" dy={index === 0 ? 0 : 15}>
                            {line}
                          </tspan>
                        )
                      )}
                    </text>
                  </g>
                </g>
                <defs>
                  <clipPath id={`clip_image_${key}`}>
                    <rect width="100" height={110} fill="white" />
                  </clipPath>
                  <pattern
                    id={`pattern_${key}`}
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref={`#image_${key}`}
                      transform="matrix(0.000837427 0 0 0.000814996 -0.172454 0)"
                    />
                  </pattern>
                  <image
                    id={`image_${key}`}
                    width="1000"
                    height="420"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref={`data:image/png;base64,${images[key]}`}
                  />
                </defs>
              </>
            );
          })}
        </g>

        <defs>
          <clipPath id="clip0">
            <rect
              width="398"
              height={110 * result.data.length}
              rx="20"
              fill="white"
            />
          </clipPath>
        </defs>
      </>
    </Article>
  );
};
