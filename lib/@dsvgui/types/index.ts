import { ReactNode, SVGAttributes } from "react";

export type IDocumentProps = SVGAttributes<SVGElement> & {
  children?: ReactNode;
  w: number;
  h: number;
  padding: number;
};

export type IconProps = SVGAttributes<SVGElement> & {
  children?: ReactNode;
};

export type IBoxShadow = {
  children?: ReactNode;
  width: number;
  padding: number;
  height: number;
  id: string;
};
