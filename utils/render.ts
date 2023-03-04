import ReactDOMServer from "react-dom/server";

const render = (JSXString: JSX.Element) => {
  return ReactDOMServer.renderToString(JSXString);
};

export default render;
