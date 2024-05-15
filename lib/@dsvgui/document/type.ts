export type DocumentMeta = {
  document?: {
    w: number;
    h: number;
  };
};

export type GridItem<T> = {
  component: React.FC<T>;
} & DocumentMeta;
