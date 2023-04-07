import { Document } from "@/lib/@dsvgui";
import { getTextWidth } from "@/lib/@dsvgui/utils";

export type IFlock = {
  title?: string;
  subtitle?: string;
  items_per_row: number;
  members: {
    image: {
      value: string;
      width: number;
      height: number;
    };
    caption: string;
  }[];
};

export const Flock: React.FC<IFlock> = ({
  title,
  subtitle,
  items_per_row,
  members,
}) => {
  let gap = 35;
  const numRows = Math.ceil(members.length / items_per_row);

  const titleFontSize = title ? 16 : 0;
  const subtitleFontSize = subtitle ? 12 : 0;
  const padding = 25;

  const head_start = { x: title ? 10 : 0, y: title ? 25 : 5 };
  const box_start = {
    x: 25,
    y: head_start.y + titleFontSize + subtitleFontSize + padding / 2,
  };

  const titleWidth = title
    ? getTextWidth(title, { fontSize: titleFontSize })
    : 0;
  const subtitleWidth = subtitle
    ? getTextWidth(subtitle, { fontSize: subtitleFontSize })
    : 0;

  const documentWidth =
    15 +
    Math.max(
      titleWidth,
      subtitleWidth,
      (members.length > items_per_row ? items_per_row : members.length) * gap
    );
  const documentHeight =
    head_start.y + titleFontSize + subtitleFontSize + numRows * gap;

  return (
    <Document w={documentWidth} h={documentHeight} padding={10}>
      {title && (
        <text
          xmlns="http://www.w3.org/2000/svg"
          className="title"
          xmlSpace="preserve"
          fontFamily="Roboto"
          fontSize={titleFontSize}
          fontWeight="500"
          letterSpacing="-0.02em"
        >
          <tspan x={head_start.x} y={head_start.y}>
            {title}
          </tspan>
        </text>
      )}
      {subtitle && (
        <text
          xmlns="http://www.w3.org/2000/svg"
          className="subtitle"
          xmlSpace="preserve"
          fontFamily="Roboto"
          fontSize={subtitleFontSize}
          fontWeight="400"
          letterSpacing="-0.02em"
        >
          <tspan x={head_start.x} y={head_start.y + titleFontSize}>
            {subtitle}
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
              cx={box_start.x + gap * col}
              cy={box_start.y + row * gap}
              r="15.5"
              fill={`url(#member${index})`}
              stroke="#ddd"
            />
            <defs>
              <pattern
                xmlns="http://www.w3.org/2000/svg"
                id={`member${index}`}
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref={`#image${index}`}
                  transform="scale(0.00217391)"
                />
              </pattern>
              <image
                xmlns="http://www.w3.org/2000/svg"
                id={`image${index}`}
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
