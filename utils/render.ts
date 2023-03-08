import ReactDOMServer from "react-dom/server";

const stripParentElements = (string: string) => {
  if (string.indexOf("<svg") === 0) {
    return string;
  }

  return string.replace(/^.*(<svg)/g, "$1").replace(/(<\/svg>).*$/g, "$1");
};

const render = (JSXElement: JSX.Element) => {
  const string = ReactDOMServer.renderToString(JSXElement)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");

  return stripParentElements(string);
};

export default render;
