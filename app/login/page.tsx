'use client';
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginPage() {
  const { data: session } = useSession()
  console.log(session)

  if (session) {
    return (
      <>
        <p>Welcome, {session?.user?.name}</p>
        <img src={session?.user?.image || ""} alt="photo" width={60} />
        <p>
        Signed in as {session?.user?.email} <br />
        </p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("github")}>Sign in</button>
    </>
  )
}