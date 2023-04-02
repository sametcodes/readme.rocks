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
        <title>readme.rocks</title>
        <meta property="og:title" content="readme.rocks" />
        <meta
          name="description"
          content="Readme.rocks - Developer Stats on your GitHub profile"
          key="desc"
        />
        <meta
          property="og:description"
          content="Display your coding stats from various platforms on your GitHub profile with Readme.rocks"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://readme.rocks/assets/meta-img.jpeg"
        />
        <meta property="og:url" content="https://readme.rocks/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://readme.rocks/" />
        <meta name="twitter:creator" content="@sametcodes" />
        <meta name="twitter:title" content="readme.rocks" />
        <meta
          name="twitter:description"
          content="Display your coding stats from various platforms on your GitHub profile with Readme.rocks"
        />
        <meta
          name="twitter:image"
          content="https://readme.rocks/assets/meta-img.jpeg"
        />
      </head>
      <body className="bg-light-lp-gradient bg-no-repeat dark:bg-dark-lp-gradient min-h-screen overflow-x-hidden">
        <Layout session={session}>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
