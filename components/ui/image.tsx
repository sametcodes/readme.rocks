import { useState } from "react";
import NextImage, { ImageProps } from "next/image";
import { cn } from "@/utils";

export const Image = (props: ImageProps) => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div
      className={cn(
        loaded && "animate-pulse w-full max-h-[400px] bg-slate-200 rounded-lg"
      )}
    >
      <NextImage onLoadingComplete={() => setLoaded(false)} {...props} />
    </div>
  );
};
