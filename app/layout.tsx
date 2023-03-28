import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Layout from "@/components/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <title>devstats ― developer stats</title>
        <meta name="description" content="dev stats ― developer stats" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="dark:bg-[#22272e]">
        <Layout session={session}>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
