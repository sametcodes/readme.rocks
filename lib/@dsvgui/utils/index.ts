import getImageSize from "image-size";
import opentype from "opentype.js";
import { loadFontBuffer } from "./fonts";
import { FontFamily, defaultFont } from "../document/fonts";

type IGetTextWidth = (
  inputText: string | number | null,
  options: {
    fontSize: number;
    fontWeight?: number;
    fontFamily?: FontFamily;
  }
) => number;

export const getTextWidth: IGetTextWidth = (inputText, options) => {
  const { fontSize, fontWeight = 500, fontFamily = defaultFont } = options;

  let text = inputText ?? "";
  text = text.toString();

  const fontBuffer = loadFontBuffer(fontFamily, fontWeight);
  const font = opentype.parse(fontBuffer);
  return font.getAdvanceWidth(text, fontSize);
};

type IWrapText = (
  inputText: string,
  options: {
    maxLineWidth: number;
    maxLines?: number;
    fontSize: number;
    fontWeight?: number;
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
    const testWidth = getTextWidth(testLine, {
      fontSize: options.fontSize,
      fontWeight: options.fontWeight,
    });

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

export function rgbToHex([r, g, b]: Array<number>) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function hexToRgb(hex: string, alpha = 1) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b, alpha];
}

export function stringToColorCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }

  const color = ((hash * 123456789) % 0xffffff).toString(16);
  return "#" + "0".repeat(6 - color.length) + color;
}

export function generateColorVariations(inputColor: string, step: number = 5) {
  const variations: Array<string> = [];
  for (let i = 0; i <= step; i++) {
    const rgb = hexToRgb(inputColor, 1);
    const alpha = i * (1 / step);
    variations.push(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha || 0.05})`);
  }

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
