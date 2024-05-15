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

const links = [
  {
    title: "Build",
    href: "/build",
  },
];

export default function NavbarWithLogin({ session }: INavbarWithLogin) {
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
        {!session ? (
          <div
            className="text-lg font-semibold text-slate-700 sm:text-sm cursor-pointer hover:text-slate-700 dark:text-gray-300 hover:dark:text-gray-500"
            onClick={() => signIn("github")}
          >
            Login with GitHub
          </div>
        ) : (
          <Link href="/connect" className="cursor-pointer flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-lg font-semibol text-slate-600 cursor-pointer sm:text-sm hover:text-slate-800 flex items-center dark:text-gray-300 dark:hover:text-gray-400">
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <span className="ml-2">{session.user.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className={cn(
                      "text-slate-500 flex sm:hidden",
                      link.href.startsWith(`/${segment}`) && "text-slate-900"
                    )}
                  >
                    <DropdownMenuItem>{link.title}</DropdownMenuItem>
                  </Link>
                ))}
                <DropdownMenuItem className="text-slate-500">
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-500">
                  <Link href="/connect">Connects</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-slate-500"
                >
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
