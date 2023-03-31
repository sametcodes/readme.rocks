import {
  Manrope300,
  Manrope500,
  Manrope700,
} from "@/lib/@dsvgui/document/fonts";
import { IBoxShadow } from "@/lib/@dsvgui/types";

export const Style: React.FC = () => {
  return (
    <defs>
      <style>{`
            @font-face {
                font-family: 'Manrope';
                font-style: normal;
                font-weight: 300;
                font-display: swap;
                src: url('${Manrope300}') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            @font-face {
                font-family: 'Manrope';
                font-style: normal;
                font-weight: 500;
                font-display: swap;
                src: url('${Manrope500}') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            @font-face {
                font-family: 'Manrope';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url('${Manrope700}') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            text{ font-family: 'Manrope', 'Open Sans', 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif; }
            @media (prefers-color-scheme: dark) {
              .dsvgui-container { fill: #32373e }
              text { fill: #eeeeee }
              .icon{ fill: #eeeeee }
              stop[offset='0']{ stop-color: #32373e; }
              stop[offset='1']{ stop-color: #32373e; }
            }
        `}</style>
    </defs>
  );
};

export const BoxShadow: React.FC<IBoxShadow> = ({
  children,
  width,
  height,
  padding,
  id,
}) => (
  <>
    <g filter={`url(#crispEdges_${id})`}>
      <rect
        className="dsvgui-container"
        width={width}
        height={height}
        rx="20"
        fill="white"
        shape-rendering="crispEdges"
      />
      {children}
    </g>
    <defs>
      <filter
        id={`cripsEdges_${id}`}
        x="-2"
        y="-1"
        width={width + padding}
        height={height + padding}
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_39_272"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_39_272"
          result="shape"
        />
      </filter>
    </defs>
  </>
);
