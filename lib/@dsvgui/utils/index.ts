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
