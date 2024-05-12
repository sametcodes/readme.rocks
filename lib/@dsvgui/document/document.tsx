import React, { ReactNode, SVGAttributes } from "react";
import { Style, Container, Branding } from "..";
import { getTextWidth } from "../utils";

export type IDocumentProps = SVGAttributes<SVGElement> & {
  children?: ReactNode;
  w: number;
  h: number;
  padding?: number;
  margin?: number;
  useBranding?: boolean;
};

export const getDocumentSize = ({
  w,
  h,
  margin = 10,
  unitHeight = 90,
  unitWidth = 90,
}: {
  w: number;
  h: number;
  margin?: number;
  unitHeight?: number;
  unitWidth?: number;
}) => {
  return {
    width: w * unitWidth + margin * (w - 1),
    height: h * unitHeight + margin * (h - 1),
  };
};

export const Document: React.FC<IDocumentProps> = (props) => {
  let { w, h } = props;
  const { useBranding = true, ...rest } = props;
  const documentId = Math.random().toString(36).substr(2, 9);

  const padding = rest.padding ?? 40;
  const margin = rest.margin ?? 4;
  const brand = "readme.rocks";

  w -= margin + padding;
  h -= margin + padding;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w + margin + padding}
      height={h + margin + padding}
      viewBox={`-${margin / 2 - padding} -${margin / 2 - padding} ${
        w + margin + padding
      } ${h + margin + padding}`}
      fill="none"
      {...rest}
      dangerouslySetInnerHTML={undefined}
    >
      <Style />
      <Container
        width={w}
        height={h}
        margin={margin}
        padding={padding}
        id={documentId}
      >
        {props.children}
      </Container>
      {useBranding && (
        <Branding
          x={w - getTextWidth(brand, { fontSize: 8 }) + padding / 2}
          y={h + padding - 5}
        />
      )}
    </svg>
  );
};
