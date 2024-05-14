import { ReactNode, SVGAttributes } from "react";
import { Style, Container, Branding } from "@/lib/@dsvgui";
import { getTextWidth } from "../utils";

export type IDocumentProps = SVGAttributes<SVGElement> & {
  children?: ReactNode;
  w: number;
  h: number;
  padding?: number;
  margin?: number;
  useBranding?: boolean;
};

export const Document: React.FC<IDocumentProps> = (props) => {
  const { w, h, useBranding = true, ...rest } = props;
  const documentId = Math.random().toString(36).substr(2, 9);

  const padding = rest.padding ?? 40;
  const margin = rest.margin ?? 4;
  const brand = "readme.rocks";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w + margin + padding}
      height={h + margin + padding}
      viewBox={`-${margin / 2 - padding} -${margin / 2 - padding} ${
        w + margin + padding
      } ${h + margin + padding}`}
      fill="none"
      // {...rest}
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
