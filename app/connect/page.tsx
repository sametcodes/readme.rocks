import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

import prisma from "@/services/prisma";
import { Connects } from "@/components/connects";

export type IConnectionWithPlatforms = {
  id: string;
  profile: { name: string; email: string; image: string } | null;
  platform: {
    id: string;
    name: string;
    code: string;
    _count: { queries: number };
  };
};

export default async function Connect() {
  const session = await getServerSession(authOptions);
  let connectionWithPlatforms: IConnectionWithPlatforms[] = [];

  if (!session) redirect("/");

  if (session) {
    connectionWithPlatforms = await prisma.connection.findMany({
      where: { userId: session.user.id, type: "oauth" },
      select: {
        id: true,
        profile: { select: { name: true, email: true, image: true } },
        platform: {
          select: {
            id: true,
            code: true,
            name: true,
            _count: { select: { queries: true } },
          },
        },
      },
    });
  }

  const platforms = await prisma.platform.findMany({
    where: session ? { require_auth: true } : {},
    include: { _count: { select: { queries: true } } },
  });

  const noAuthRequiredPlatforms = await prisma.platform.findMany({
    where: { require_auth: false },
    include: { _count: { select: { queries: true } } },
  });

  const allPlatforms =
    connectionWithPlatforms.length === 0
      ? platforms
      : platforms.filter((platform) => {
          return !connectionWithPlatforms.find(
            (connection) => connection.platform.code === platform.code
          );
        });

  return (
    <Connects
      session={session}
      connectionWithPlatforms={connectionWithPlatforms}
      noAuthRequiredPlatforms={noAuthRequiredPlatforms}
      allPlatforms={allPlatforms}
    />
  );
}
