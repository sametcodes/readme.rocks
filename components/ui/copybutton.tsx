"use client";

import { cn } from "@/utils";
import React, { useState, useEffect } from "react";

type ICopyButton = {
  children: React.ReactNode;
  value: string;
  className?: string;
};

export const CopyButton = ({ children, value, className }: ICopyButton) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("Click to copy");

  const onClick = async () => {
    await navigator.clipboard.writeText(value);
    setTooltipText("Copied");

    setTimeout(() => {
      setTooltipText("Click to copy");
    }, 1000);
  };

  return (
    <div className={className}>
      <div
        className={cn(
          "cursor-pointer absolute top-0 left-1/2 -translate-x-1/2 -mt-8 bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap",
          showTooltip ? "visible" : "invisible"
        )}
      >
        {tooltipText}
      </div>
      <div
        className="cursor-pointer w-full"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
    </div>
  );
};
