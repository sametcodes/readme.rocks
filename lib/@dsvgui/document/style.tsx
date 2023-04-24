import * as Manrope from "./fonts/manrope";

const buildFontFace = (font: string, weight: number, value: string) => {
  return `@font-face {
    font-family: '${font}';
    font-style: normal;
    font-weight: ${weight};
    font-display: swap;
    src: url('data:application/font-woff;base64,${value}') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }`;
};

export const Style: React.FC = () => {
  return (
    <defs>
      <style>{`
            ${buildFontFace("Manrope", 300, Manrope.W300)} 
            ${buildFontFace("Manrope", 500, Manrope.W500)} 
            ${buildFontFace("Manrope", 700, Manrope.W700)} 
            text{ font-family: 'Manrope', 'Open Sans', 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif; }
            text.title{ fill: #32373e; font-size: 22px; }
            text.subtitle{ fill: #9c9c9c; font-size: 16px; }
            .dsvgui-container{ fill: #fbfbfb; }
            stop[offset='0']{ stop-color: #fbfbfb; }
            stop[offset='1']{ stop-color: #fbfbfb; }
            .border{ stroke: #ddd; }
            #dsvguibranding { fill: #bbbbbb; }
            .divider{ stroke: #dddddd; }
            @media (prefers-color-scheme: dark) {
              .dsvgui-container { fill: #32373e }
              stop[offset='0']{ stop-color: #32373e; }
              stop[offset='1']{ stop-color: #32373e; }
              text { fill: #eeeeee }
              .icon{ fill: #dddddd; stroke: #dddddd; }
              text.title{ fill: #fff; }
              text.subtitle{ fill: #9c9c9c; }
              .border{ stroke: #555; }
              #dsvguibranding { fill: #666666; }
              .divider{ stroke: #555555; }
            }
        `}</style>
    </defs>
  );
};
