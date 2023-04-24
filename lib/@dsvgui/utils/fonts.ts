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
