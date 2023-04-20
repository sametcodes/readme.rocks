import getImageSize from "image-size";

type IGetTextWidth = (
  inputText: string | number | null,
  options: {
    fontSize: number;
    ratio?: number;
  }
) => number;

export const getTextWidth: IGetTextWidth = (inputText, options) => {
  const { fontSize = 16, ratio = 0.5 } = options;

  let width = 0;
  let text = inputText ?? "";
  text = text.toString();

  // Estimate the width using a monospace font (each character has the same width)
  width = text.length * fontSize * ratio;
  return width;
};

type IWrapText = (
  inputText: string,
  options: {
    maxLineWidth: number;
    fontSize: number;
    maxLines?: number;
  },
  cb: (value: string, index: number, array: Array<string>) => JSX.Element
) => Array<JSX.Element>;

export const wrapText: IWrapText = (inputText, options, cb) => {
  const maxLineWidth = options.maxLineWidth;
  const words = inputText.split(" ");

  const lines: Array<string> = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + " " + word;
    const testWidth = getTextWidth(testLine, { fontSize: options.fontSize });

    if (testWidth > maxLineWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  lines.push(currentLine);
  return lines.slice(0, options.maxLines).map(cb);
};

type IConvertDateToReadbleFormat = (isoTimestamp: string) => string;
export const convertDateToReadableFormat: IConvertDateToReadbleFormat = (
  isoTimestamp
) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(isoTimestamp);

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear().toString().substr(2, 2);

  if (new Date().getFullYear() === date.getFullYear()) return `${month} ${day}`;

  return `${month} ${day} '${year}`;
};

export function stringToColorCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }

  const color = ((hash * 123456789) % 0xffffff).toString(16);
  return "#" + "0".repeat(6 - color.length) + color;
}

export function generateColorVariations(
  inputColor: string,
  endColorValue: string
) {
  function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
  }

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  const middleColor = hexToRgb(inputColor);
  const endColor = hexToRgb(endColorValue);
  const variations = [];

  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    const r = Math.round(lerp(middleColor[0], endColor[0], t));
    const g = Math.round(lerp(middleColor[1], endColor[1], t));
    const b = Math.round(lerp(middleColor[2], endColor[2], t));
    const hexColor = rgbToHex(r, g, b);

    variations.push(hexColor);
  }

  const startColor = middleColor.map((c) => Math.max(c * 2 - 255, 0));
  const darkColor = rgbToHex(startColor[0], startColor[1], startColor[2]);
  variations[0] = darkColor;

  return variations;
}

export async function readImageURL(url: string) {
  const response = await fetch(url, {
    referrerPolicy: "no-referrer",
    redirect: "follow",
  });
  const arrayBuffer = await response.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);
  const imageData = getImageSize(buffer);

  return {
    value: buffer.toString("base64"),
    width: imageData.width,
    height: imageData.height,
  };
}
