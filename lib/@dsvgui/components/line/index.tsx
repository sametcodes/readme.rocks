import { Document } from "@/lib/@dsvgui";
import { getTextWidth } from "../../utils/index";

type ILine = {
  title: string;
  subtitle: string;
  total: string;
  points: number[];
};

export const Line: React.FC<ILine> = ({ title, subtitle, total, points }) => {
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
    const x_gap = (width - 20) / points.length;
    let x = 10;
    let path =
      "M " + x + " " + (height - 5 - (points[0] / max_value) * height * ratio);
    for (let i = 0; i <= points.length; i++) {
      x += x_gap;
      path +=
        " L " +
        x +
        " " +
        (height - 5 - (points[i] / max_value) * height * ratio);
    }

    return path;
  }

  const title_width = getTextWidth(title, { fontSize: 16 });
  const subtitle_width = getTextWidth(subtitle, { fontSize: 16 });

  const titles_width = Math.max(title_width, subtitle_width);

  const total_text_width = titles_width + getTextWidth(total, { fontSize: 24 });
  const height = 110;
  const width = total_text_width + 100;
  const path_value = createDynamicSvgPath({ height, width, ratio: 0.5 });

  return (
    <Document w={width} h={height} padding={10}>
      <path
        d={path_value}
        stroke="url(#paint0_linear_135_79)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        fill="#000000"
        xmlSpace="preserve"
        fontFamily="Roboto"
        fontSize="16"
        fontWeight="bolder"
        letterSpacing="0.5px"
      >
        <tspan x="26" y="32.4688">
          {title}
        </tspan>
      </text>
      <text
        fill="#555555"
        xmlSpace="preserve"
        fontFamily="Roboto"
        fontSize="14"
        fontWeight={500}
        letterSpacing="0.5px"
      >
        <tspan x="26" y="50.4688">
          {subtitle}
        </tspan>
      </text>
      <text
        fill="black"
        xmlSpace="preserve"
        fontFamily="Roboto"
        fontSize="24"
        fontWeight="bold"
        letterSpacing="0.5px"
      >
        <tspan
          x={width - 26 - getTextWidth(total, { fontSize: 24 })}
          y="42.7031"
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
