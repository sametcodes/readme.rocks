import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../services/prisma";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [],
  secret: process.env.JWT_SECRET,
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
