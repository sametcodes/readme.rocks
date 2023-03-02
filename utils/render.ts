import ReactDOMServer from "react-dom/server";

const render = (JSXString: JSX.Element) => {
  const SVGDocumentString = decodeURIComponent(
    ReactDOMServer.renderToString(JSXString)
  )
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");

  return SVGDocumentString;
};

export default render;
