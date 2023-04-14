import ReactDOMServer from "react-dom/server";

const stripParentElements = (str: string) => {
  if (str.indexOf("<svg") === 0) {
    return str;
  }

  return str.replace(/^.*(<svg)/g, "$1").replace(/(<\/svg>).*$/g, "$1");
};

const render = (JSXElement: JSX.Element) => {
  const output = ReactDOMServer.renderToString(JSXElement)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");

  return stripParentElements(output);
};

export default render;
