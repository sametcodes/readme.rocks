import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/services/prisma";
import callbacks from "@/services/nextauth/callbacks";

import GithubProvider from "next-auth/providers/github";
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

if (GITHUB_CLIENT_ID === undefined || GITHUB_CLIENT_SECRET === undefined) {
  throw new Error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be defined");
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            "read:user",
            "user",
            "user:email",
            "gist",
            "repo",
            "project",
          ].join(","),
        },
      },
      client: {
        redirect_uris: [`${process.env.NEXTAUTH_URL}/api/auth/callback/github`],
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks,
};

export default NextAuth(authOptions);
