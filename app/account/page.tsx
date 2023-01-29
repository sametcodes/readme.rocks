"use client";
import { useSession, signOut } from "next-auth/react"

export default function Account() {
  const { data: session } = useSession({required: true})

  if (session) {
    return (
      <>
        <p>Welcome, {session?.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    <p>
        Not signed in
    </p>
    </>
  )
}