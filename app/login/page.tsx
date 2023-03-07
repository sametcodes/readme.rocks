"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const { data: session } = useSession();

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
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("github")}>Sign in</button>
    </>
  );
}
