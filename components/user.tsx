"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";

export default function UserLogin({ session }: any) {
  if (session) {
    return (
      <>
        <p>Welcome, {session?.user?.name}</p>
        <Image
          src={session?.user?.image || ""}
          alt="photo"
          width={60}
          height={60}
        />
        <p>
          Signed in as {session?.user?.email} <br />
        </p>

        <Link href="/connect">
          <p>Go to connections</p>
        </Link>
        <button
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn("github")}>Sign in</button>
    </div>
  );
}
