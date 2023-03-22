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
