import { Document } from "@/lib/@dsvgui";
import { getTextWidth } from "@/lib/@dsvgui/utils";

export type IFlock = {
  title?: string;
  subtitle?: string;
  items_per_row: number;
  members: Array<{
    image: {
      value: string;
      width: number;
      height: number;
    };
    caption: string;
  }>;
};

export const Flock: React.FC<IFlock> = ({
  title,
  subtitle,
  items_per_row,
  members,
}) => {
  const circleSize = 50;
  const circleGap = 5;
  const numRows = Math.ceil(members.length / items_per_row);

  const titleFontSize = title ? 22 : 0;
  const subtitleFontSize = subtitle ? 16 : 0;

  const headStart = { x: 0, y: 20 };
  const boxStart = {
    x: circleSize / 2,
    y: headStart.y + titleFontSize + subtitleFontSize + circleSize / 2,
  };

  const titleWidth = title
    ? getTextWidth(title.trim(), { fontSize: titleFontSize })
    : 0;
  const subtitleWidth = subtitle
    ? getTextWidth(subtitle.trim(), {
        fontSize: subtitleFontSize,
      })
    : 0;

  const documentWidth = Math.max(
    titleWidth,
    subtitleWidth,
    (members.length > items_per_row ? items_per_row : members.length) *
      (circleSize + circleGap)
  );
  const documentHeight =
    headStart.y +
    titleFontSize +
    subtitleFontSize +
    numRows * (circleSize + circleGap);

  const documentId = Math.random().toString(36).substr(2, 9);
  return (
    <Document w={documentWidth} h={documentHeight}>
      {title && (
        <text
          xmlns="http://www.w3.org/2000/svg"
          className="title"
          fontFamily="Manrope"
          fontWeight="500"
        >
          <tspan x={headStart.x} y={headStart.y}>
            {title.trim()}
          </tspan>
        </text>
      )}
      {subtitle && (
        <text
          xmlns="http://www.w3.org/2000/svg"
          className="subtitle"
          fontFamily="Manrope"
          fontWeight="400"
        >
          <tspan x={headStart.x} y={headStart.y + titleFontSize}>
            {subtitle.trim()}
          </tspan>
        </text>
      )}
      {members.map((member, index) => {
        const row = Math.floor(index / items_per_row);
        const col = index % items_per_row;

        return (
          <>
            <circle
              xmlns="http://www.w3.org/2000/svg"
              className="border"
              cx={boxStart.x + col * (circleSize + circleGap)}
              cy={boxStart.y + row * (circleSize + circleGap)}
              r={circleSize / 2}
              fill={`url(#member${documentId}${index})`}
              stroke="#ddd"
            />
            <defs>
              <pattern
                xmlns="http://www.w3.org/2000/svg"
                id={`member${documentId}${index}`}
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref={`#image${documentId}${index}`}
                  transform="scale(0.00217391)"
                />
              </pattern>
              <image
                xmlns="http://www.w3.org/2000/svg"
                id={`image${documentId}${index}`}
                width="460"
                height="460"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref={`data:image/png;base64,${member.image.value}`}
              />
            </defs>
          </>
        );
      })}
    </Document>
  );
};
