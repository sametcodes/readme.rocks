"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { cn } from "@/utils";
import { useSelectedLayoutSegment } from "next/navigation";

type INavbarWithLogin = {
  session: Session | null;
};

const links = [
  {
    title: "Changelog",
    href: "/changelog",
  },
  {
    title: "App",
    href: "/app",
  },
  {
    title: "Join",
    href: "/join",
  },
];

export default function NavbarWaitlist({ session }: INavbarWithLogin) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex h-16 mx-auto px-8 sm:px-0 items-center justify-between border-b border-b-slate-200 py-4 dark:border-b-gray-500">
      <Link href="/" className="items-center space-x-2 md:flex">
        <span className="text-2xl font-bold sm:inline-block">readme.rocks</span>
      </Link>
      <nav className="flex gap-6">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "items-center text-lg text-slate-600 sm:text-sm hidden sm:flex dark:text-gray-400",
              link.href.startsWith(`/${segment}`) &&
                "text-slate-900 font-semibold dark:text-gray-200"
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
