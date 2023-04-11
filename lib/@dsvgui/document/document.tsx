import { ReactNode, SVGAttributes } from "react";
import { Style, Container } from "@/lib/@dsvgui";

export type IDocumentProps = SVGAttributes<SVGElement> & {
  children?: ReactNode;
  w: number;
  h: number;
  padding?: number;
  margin?: number;
};

export const Document: React.FC<IDocumentProps> = (props) => {
  const { w, h, ...rest } = props;
  const document_id = Math.random().toString(36).substr(2, 9);

  const padding = rest.padding ?? 30;
  const margin = rest.margin ?? 10;

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
    >
      <Style />
      <Container
        width={w}
        height={h}
        margin={margin}
        padding={padding}
        id={document_id}
      >
        {props.children}
      </Container>
    </svg>
  );
};
