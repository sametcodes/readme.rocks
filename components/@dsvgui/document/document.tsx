import { Style, BoxShadow, IDocumentProps } from "@/components/@dsvgui";

export const Document: React.FC<IDocumentProps> = (props) => {
  const { w, h, ...rest } = props;
  let padding = 10;
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
      <BoxShadow width={w} height={h} padding={padding}>
        {props.children}
      </BoxShadow>
    </svg>
  );
};
