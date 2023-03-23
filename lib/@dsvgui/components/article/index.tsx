import { Document } from "@/lib/@dsvgui";

type IArticle = {
  children: React.ReactNode;
  width: number;
  height: number;
};

export const Article: React.FC<IArticle> = ({ children, width, height }) => {
  return (
    <Document w={width} h={height} padding={10}>
      {children}
    </Document>
  );
};
