"use client";

import { Session } from "next-auth";
import { signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Logi({ session }: { session: Session | null }) {
  return (
    <nav className="flex items-center">
      {!session ? (
        <div className="px-4 cursor-pointer" onClick={() => signIn("github")}>
          Login
        </div>
      ) : (
        <>
          <div className="px-4 cursor-pointer" onClick={() => signOut()}>
            Logout
          </div>
          <Link
            href="/connect"
            className="px-4 cursor-pointer flex items-center"
          >
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <span>Dashboard</span>
          </Link>
        </>
      )}
    </nav>
  );
}
