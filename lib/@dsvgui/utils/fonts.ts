import * as Manrope from "../document/fonts/manrope";

type ManropeType = { [key: string]: string };
const ManropeTyped = Manrope as ManropeType;

function bufferToArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}

const fonts: {
  [key: string]: {
    [key in keyof ManropeType]: ArrayBuffer;
  };
} = {};

export const loadFontBuffer = (
  fontFamily: string,
  fontWeight: keyof ManropeType
) => {
  const weight = "W" + fontWeight.toString();

  if (fonts && fonts[fontFamily] && fonts[fontFamily][fontWeight])
    return fonts[fontFamily][weight];
  const fontBuffer = bufferToArrayBuffer(
    Buffer.from(ManropeTyped[weight], "base64")
  );
  if (!fonts[fontFamily]) fonts[fontFamily] = {};
  fonts[fontFamily][weight] = fontBuffer;
  return fontBuffer;
};

export const buildFontFace = (font: string, weight: number, value: string) => {
  return `@font-face {
    font-family: '${font}';
    font-style: normal;
    font-weight: ${weight};
    font-display: swap;
    src: url('data:application/font-woff;base64,${value}') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }`;
};
