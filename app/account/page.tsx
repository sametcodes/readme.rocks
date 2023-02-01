"use client";
import { useSession, signOut } from "next-auth/react"
import { useState } from "react";
import { FormEvent, ChangeEvent } from "react";

export default function Account() {
  const { data: session } = useSession({required: true})

  const [form, setForm] = useState({github: "", stackoverflow:"", codewars:""})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setForm({...form, [event.target.name]: event.target.value})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("form submitted")
  }

  console.log(form)
  if (session) {
    return (
      <>
        <p>Welcome, {session?.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>

        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="github username" name="github" value={form.github} onChange={handleChange} />
          <input type="text" placeholder="stackoverflow username" name="stackoverflow" value={form.stackoverflow} onChange={handleChange} />
          <input type="text" placeholder="codewars username" name="codewars" value={form.codewars} onChange={handleChange}/>
          <button type="submit" >Submit</button>
        </form>
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