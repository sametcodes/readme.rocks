import React, { ReactNode } from "react";

export type IContainer = {
  children?: ReactNode;
  width: number;
  margin: number;
  padding: number;
  height: number;
  id: string;
};

export const Container: React.FC<IContainer> = ({
  children,
  width,
  height,
  margin,
  padding,
  id,
}) => (
  <>
    <g filter={`url(#crispEdges_${id})`}>
      <rect
        className="dsvgui-container"
        width={width + padding}
        height={height + padding}
        rx="20"
        fill="white"
        shapeRendering="crispEdges"
      />
      <g transform={`translate(${padding / 2}, ${padding / 2})`}>{children}</g>
    </g>
    <defs>
      <filter
        id={`crispEdges_${id}`}
        x="-2"
        y="-1"
        width={width + margin + padding}
        height={height + margin + padding}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_39_272"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_39_272"
          result="shape"
        />
      </filter>
    </defs>
  </>
);
