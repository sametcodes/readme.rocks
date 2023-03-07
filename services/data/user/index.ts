import prisma from "@/services/prisma";
import { DataAPIPayload } from "@/services/data/types";

export const getUser = async ({ payload, session }: DataAPIPayload) => {
  const user = await prisma.user.findFirst({ where: { id: session.user.id } });
  if (!user) throw new Error("User not found");

  return user;
};
