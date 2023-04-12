import { Document } from "@/lib/@dsvgui";
import { getTextWidth } from "@/lib/@dsvgui/utils/index";

type ILine = {
  title: string;
  subtitle: string;
  total: string;
  points: number[];
};

export const Line: React.FC<ILine> = ({ title, subtitle, total, points }) => {
  const document_padding = 40;

  function createDynamicSvgPath({
    height,
    width,
    ratio,
  }: {
    height: number;
    width: number;
    ratio: number;
  }): string {
    const max_value = Math.max(...points);
    const x_gap = width / points.length;
    let x = 0;
    let path =
      "M " +
      x +
      " " +
      (height +
        document_padding / 2 -
        5 -
        (points[0] / max_value) * height * ratio);
    for (let i = 0; i <= points.length; i++) {
      x += x_gap;
      path +=
        " L " +
        x +
        " " +
        (height +
          document_padding / 2 -
          5 -
          (points[i] / max_value) * height * ratio);
    }

    return path;
  }

  const title_width = getTextWidth(title, { fontSize: 16 });
  const subtitle_width = getTextWidth(subtitle, { fontSize: 16 });

  const titles_width = Math.max(title_width, subtitle_width);

  const total_text_width = titles_width + getTextWidth(total, { fontSize: 24 });
  const height = 90;
  const width = total_text_width + 100;
  const path_value = createDynamicSvgPath({ height, width, ratio: 0.7 });

  return (
    <Document w={width} h={height} padding={document_padding}>
      <path
        d={path_value}
        stroke="url(#paint0_linear_135_79)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        xmlSpace="preserve"
        fontFamily="Roboto"
        className="title"
        fontWeight="bolder"
        letterSpacing="0.5px"
      >
        <tspan x="0" y="15">
          {title}
        </tspan>
      </text>
      <text
        fill="#555555"
        xmlSpace="preserve"
        fontFamily="Roboto"
        className="subtitle"
        fontWeight={500}
      >
        <tspan x="0" y="33">
          {subtitle}
        </tspan>
      </text>
      <text
        fill="black"
        xmlSpace="preserve"
        fontFamily="Roboto"
        className="title"
        fontWeight="bolder"
      >
        <tspan
          x={width - getTextWidth(total, { fontSize: 22, ratio: 0.52 })}
          y="15"
        >
          {total}
        </tspan>
      </text>
      <defs>
        <linearGradient
          id="paint0_linear_135_79"
          x1="317"
          y1="38.6358"
          x2="29.4084"
          y2="155.088"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.141455" stopColor="#FF12E7" />
          <stop offset="0.201455" stopColor="#FF5ecc" />
          <stop offset="0.363128" stopColor="#FF9eeE" />
          <stop offset="0.581288" stopColor="#FF0AAC" />
          <stop offset="0.729526" stopColor="#FF046E" />
          <stop offset="0.943128" stopColor="#FF9eeE" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </Document>
  );
};
