"use client";

import Link from "next/link";
import { cn } from "@/utils";
import { useSelectedLayoutSegment } from "next/navigation";

// see: https://github.dev/shadcn/taxonomy/blob/main/components/main-nav.tsx#L60
type INavbar = {
  items: Array<{
    title: string;
    href: string;
    disabled?: boolean;
  }>;
};

export function Navbar({ items }: INavbar) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex gap-6 md:gap-10 items-center align-middle">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">devstats</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {items?.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? "#" : item.href}
            className={cn(
              "flex items-center text-lg font-semibold text-slate-600 sm:text-sm",
              item.href.startsWith(`/${segment}`) && "text-slate-900",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
