'use client';
import './globals.css'
import { SessionProvider } from "next-auth/react"

export default function RootLayout({children/* , session */}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>devstats ― developer stats</title>
        <meta name="description" content="dev stats ― developer stats" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
       <SessionProvider /* session={session} */>
        {children}
       </SessionProvider>
      </body>
    </html>
  )
}
