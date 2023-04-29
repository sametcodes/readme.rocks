import fonts from "../document/fonts";
import opentype from "opentype.js";

export function getFont(fontFamily: keyof typeof fonts): any {
  return fonts[fontFamily];
}

function bufferToArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}

const loadedFonts: {
  [key: string]: {
    [key: string]: ArrayBuffer;
  };
} = {};

export const loadFontBuffer = (
  fontFamily: keyof typeof fonts,
  fontWeight: number
) => {
  const weight = "W" + fontWeight.toString();
  const font = getFont(fontFamily);

  if (
    loadedFonts &&
    loadedFonts[fontFamily] &&
    loadedFonts[fontFamily][fontWeight]
  )
    return loadedFonts[fontFamily][weight];
  const fontBuffer = bufferToArrayBuffer(Buffer.from(font[weight], "base64"));
  if (!loadedFonts[fontFamily]) loadedFonts[fontFamily] = {};
  loadedFonts[fontFamily][weight] = fontBuffer;
  return fontBuffer;
};

export const loadOpenTypeFont = (
  fontFamily: keyof typeof fonts,
  fontWeight: number
) => {
  const fontBuffer = loadFontBuffer(fontFamily, fontWeight);
  return opentype.parse(fontBuffer);
};

export const buildFontFace = (fontName: keyof typeof fonts, weight: number) => {
  const font = getFont(fontName);
  const fontWeight = "W" + weight.toString();
  const fontBase64 = font[fontWeight];

  return `@font-face {
    font-family: '${fontName}';
    font-style: normal;
    font-weight: ${weight};
    font-display: swap;
    src: url('data:application/font-woff;base64,${fontBase64}') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }`;
};
