import { createCanvas } from "canvas";
import { JSDOM } from "jsdom";

export const getTextWidth = (
  inputText: string,
  options: {
    ratio: number;
  } = {
    ratio: 1,
  }
) => {
  const container = createCanvas(300, 300);
  const dom = new JSDOM("<!DOCTYPE html><body></body>");
  const window = dom.window;
  const document = window.document;

  let width = 0;
  let text = inputText ?? "";
  text = text.toString();
  let context = container.getContext("2d");

  context.font = window
    .getComputedStyle(document.body)
    .getPropertyValue("font");
  width = context.measureText(text).width;

  console.log({
    width,
    inputText,
    ratio: options.ratio,
  });
  return width * options.ratio;
};
