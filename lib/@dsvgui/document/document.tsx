import { Style, BoxShadow, IDocumentProps } from "@/lib/@dsvgui";

export const Document: React.FC<IDocumentProps> = (props) => {
  const { w, h, padding = 0, ...rest } = props;
  const document_id = Math.random().toString(36).substr(2, 9);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w + padding}
      height={h + padding}
      viewBox={`-${padding / 2} -${padding / 2} ${w + padding} ${h + padding}`}
      fill="none"
      {...rest}
    >
      <Style />
      <BoxShadow width={w} height={h} padding={padding} id={document_id}>
        {props.children}
      </BoxShadow>
    </svg>
  );
};
