import {
  Manrope300,
  Manrope500,
  Manrope700,
} from "@/lib/@dsvgui/document/fonts";

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
            text.title{ fill: #32373e; font-size: 22px; }
            text.subtitle{ fill: #9c9c9c; font-size: 16px; }
            .dsvgui-container{ fill: #fbfbfb; }
            stop[offset='0']{ stop-color: #fbfbfb; }
            stop[offset='1']{ stop-color: #fbfbfb; }
            .border{ stroke: #ddd; }
            #dsvguibranding { fill: #aaa; }
            @media (prefers-color-scheme: dark) {
              .dsvgui-container { fill: #32373e }
              stop[offset='0']{ stop-color: #32373e; }
              stop[offset='1']{ stop-color: #32373e; }
              text { fill: #eeeeee }
              .icon{ fill: #eeeeee }
              text.title{ fill: #fff; }
              text.subtitle{ fill: #9c9c9c; }
              .border{ stroke: #555; }
            }
        `}</style>
    </defs>
  );
};
