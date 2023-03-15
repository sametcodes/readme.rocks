"use client";

import { Session } from "next-auth";
import { signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui";

type INavbarWithLogin = {
  session: Session | null;
};

const items = [
  {
    title: "Queries",
    href: "/query",
  },
  {
    title: "Connect",
    href: "/connect",
  },
];

export default function NavbarWithLogin({ session }: INavbarWithLogin) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">devstats</span>
      </Link>
      <nav className="flex gap-6">
        {items?.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center text-lg font-semibold text-slate-400 sm:text-sm",
              item.href.startsWith(`/${segment}`) && "text-slate-900"
            )}
          >
            {item.title}
          </Link>
        ))}
        {!session ? (
          <div
            className="text-lg font-semibold text-slate-400 sm:text-sm cursor-pointer hover:text-slate-700"
            onClick={() => signIn("github")}
          >
            Login
          </div>
        ) : (
          <Link href="/connect" className="cursor-pointer flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-lg font-semibol text-slate-600 cursor-pointer sm:text-sm hover:text-slate-800 flex items-center">
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                {session.user.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Link>
        )}
      </nav>
    </div>
  );
}
