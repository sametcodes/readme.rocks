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
  },
  cb: (value: string, index: number, array: string[]) => JSX.Element
) => JSX.Element[];

export const wrapText: IWrapText = (inputText, options, cb) => {
  const maxLineWidth = options.maxLineWidth;
  const words = inputText.split(" ");

  const lines: string[] = [];
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

  return lines.map(cb);
};
