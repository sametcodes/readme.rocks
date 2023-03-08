import ReactDOMServer from "react-dom/server";

const render = (JSXElement: JSX.Element) => {
  const string = ReactDOMServer.renderToString(JSXElement)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");

  return string;
};

export default render;
