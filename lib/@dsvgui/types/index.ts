import { ReactNode, SVGAttributes } from "react";

export type IconProps = SVGAttributes<SVGElement> & {
  children?: ReactNode;
};
