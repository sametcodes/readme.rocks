"use client";

import { useState } from "react";
import NextImage, { ImageProps } from "next/image";
import { cn } from "@/utils";

export const Image = (props: ImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        !loaded &&
          "animate-pulse max-h-[400px] bg-slate-200 rounded-lg dark:bg-gray-700"
      )}
    >
      {!loaded && (
        <span className="absolute text-slate-500 dark:text-gray-400">
          Loading preview...
        </span>
      )}
      <NextImage onLoadingComplete={() => setLoaded(true)} {...props} />
    </div>
  );
};
