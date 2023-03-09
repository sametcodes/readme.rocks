import { ReactElement } from "react";

export const getDocumentStyle = () => {
  return `<style>
        svg{ border: 1px solid #ccc; border-radius: 10px; }
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2f80ed; animation: fadeInAnimation 0.8s ease-in-out forwards; }
        .stat { text-transform: capitalize; font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #434d58; }
        .stagger { opacity: 0; animation: fadeInAnimation 0.3s ease-in-out forwards; }
        .rank-text { font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: #434d58; animation: scaleInAnimation 0.3s ease-in-out forwards; }
        .not_bold { font-weight: 400 }
        .bold { font-weight: 700 }
        .icon { fill: #4c71f2; display: block; }
        .rank-circle-rim { stroke: #2f80ed; fill: none; stroke-width: 6; opacity: 0.2; }
        .rank-circle { stroke: #2f80ed; stroke-dasharray: 250; fill: none; stroke-width: 6; stroke-linecap: round; opacity: 0.8; transform-origin: -10px 8px; transform: rotate(-90deg); animation: rankAnimation 1s forwards ease-in-out; }

        @supports(-moz-appearance: auto) { /* Selector detects Firefox */ .header { font-size: 15.5px; } }
        @supports(-moz-appearance: auto) { /* Selector detects Firefox */ .stat { font-size:12px; } }

        /* Animations */
        @keyframes rankAnimation { from { stroke-dashoffset: 251.32741228718345; } to { stroke-dashoffset: 127.57536535528702; } }
        @keyframes scaleInAnimation { from { transform: translate(-5px, 5px) scale(0); } to { transform: translate(-5px, 5px) scale(1); } }
        @keyframes fadeInAnimation { from { opacity: 0; } to { opacity: 1; } }

        /* Media */
        @media (prefers-color-scheme: dark) { svg { background-color: #141d26 } }
     </style>`;
};

type IDocument = (props: {
  width: number;
  height: number;
  children: JSX.Element | Array<JSX.Element>;
}) => JSX.Element;

type IDocumentHeader = (props: { title: string; desc: string }) => JSX.Element;

type IDocumentTitle = (props: { children: string }) => JSX.Element;

type IList = (props: { children: any }) => JSX.Element;

export type IListItem = (props: IItem) => JSX.Element;

type IItem = {
  icon: JSX.Element;
  url?: string;
  text: string;
  value?: string;
  index?: number;
  gap?: number;
};

export const Document: IDocument = ({ width, height, children }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
    >
      {getDocumentStyle()}

      {/* <DocumentHeader title={title} desc={desc} /> */}
      {/* <DocumentBackground /> */}
      {children}
    </svg>
  );
};

export const DocumentTitle: IDocumentTitle = ({ children }) => {
  return (
    <g data-testid="card-title" transform="translate(25, 35)">
      <g transform="translate(0, 0)">
        <text x="0" y="0" className="header" data-testid="header">
          {children}
        </text>
      </g>
    </g>
  );
};

export const DocumentHeader: IDocumentHeader = ({ title, desc }) => {
  return (
    <>
      <title id="titleId">{title}</title>
      <desc id="descId">{desc}</desc>
    </>
  );
};

export const DocumentBackground = () => {
  return (
    <rect
      data-testid="card-bg"
      x="0.5"
      y="0.5"
      rx="4.5"
      width="500"
      height="120"
      stroke="#e4e2e2"
      fill="#fffefe"
      strokeOpacity="1"
    />
  );
};

export const List: IList = ({ children }) => {
  if (Array.isArray(children)) children = children.flat();

  if (!Array.isArray(children)) children = [children];

  const makeTitleShort = (
    element: ReactElement<IItem, IListItem>
  ): JSX.Element => {
    return {
      ...element,
      props: {
        ...element.props,
        value:
          element.props?.value && String(element.props.value).length > 45
            ? String(element.props.value).slice(0, 45) + "..."
            : String(element.props.value),
      },
    };
  };

  const calculateGap = (elements: Array<ReactElement<IItem, IListItem>>) => {
    if (!children) {
      return [];
    }
    const gap =
      elements
        .map((child) => child.props.text.length * 6.7)
        .reduce((a, b) => Math.max(a, b), 0) + 45;
    return elements.map((child, index) => ({
      ...child,
      props: { ...child.props, index, gap },
    }));
  };

  children = calculateGap(children.map(makeTitleShort));

  return (
    <g data-testid="main-card-body" transform="translate(0, 55)">
      <svg x="0" y="0">
        {children}
      </svg>
    </g>
  );
};

export const ListItem: IListItem = ({
  index = 0,
  gap = 0,
  icon,
  text,
  value,
  url,
}) => {
  return (
    <g transform={`translate(0, ${index * 25})`}>
      <g
        className="stagger"
        style={{ animationDelay: `${450 + 150 * index}ms` }}
        transform="translate(25, 0)"
      >
        <g className="item-info">
          {icon}
          <text className="stat bold" x="25" y="12.5">
            {text}
          </text>
        </g>

        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <text className="stat bold" x={gap} y="12.5">
              {value}
            </text>
          </a>
        ) : (
          <text className="stat bold" x={gap} y="12.5">
            {value}
          </text>
        )}
      </g>
    </g>
  );
};
