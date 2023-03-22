import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/services/prisma";

type IConnectionWithPlatforms = {
  id: string;
  expires_at: number;
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

  if (session) {
    connectionWithPlatforms = await prisma.connection.findMany({
      where: { userId: session.user.id, type: "oauth" },
      select: {
        id: true,
        expires_at: true,
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
    <div className="flex container mx-auto flex-col">
      <div className="mb-5">
        <h1 className="text-3xl font-bold my-3 text-slate-700">Connected</h1>
        <blockquote className="text-slate-700">
          <p className="text-md">
            Connect your accounts to fetch data from platforms.
          </p>
        </blockquote>
      </div>

      {session && (
        <div className="mt-[40px]">
          <h2 className="text-2xl font-bold text-slate-700">
            Connected Platforms (
            {connectionWithPlatforms.length + noAuthRequiredPlatforms.length})
          </h2>
          {connectionWithPlatforms.map((connection) => {
            return (
              <div key={connection.id} className="mt-6">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-xl inline-block">
                      {connection.platform.name}
                    </h2>
                    <span className="text-sm text-slate-400">
                      {connection.platform._count.queries} available{" "}
                      {connection.platform._count.queries === 1
                        ? "query"
                        : "queries"}
                    </span>
                  </div>
                  <a href={`/api/oauth/disconnect/${connection.platform.code}`}>
                    <p className="text-lg">Disconnect</p>
                  </a>
                </div>
              </div>
            );
          })}
          {noAuthRequiredPlatforms.map((platform) => {
            return (
              <div key={platform.id} className="mt-6">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-xl inline-block">{platform.name}</h2>
                    <span className="text-sm text-slate-400">
                      {platform._count.queries} available{" "}
                      {platform._count.queries === 1 ? "query" : "queries"}
                    </span>
                  </div>
                  <p className="text-lg text-slate-400">No auth required</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-[40px]">
        <h2 className="text-2xl font-bold text-slate-700">
          All platforms ({allPlatforms.length})
        </h2>
        {allPlatforms.map((platform) => {
          return (
            <div key={platform.id} className="mt-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="text-xl inline-block">{platform.name}</h2>
                  <span className="text-sm text-slate-400">
                    {platform._count.queries} available queries
                  </span>
                </div>
                {session ? (
                  <a href={`/api/oauth/connect/${platform.code}`}>
                    <p className="text-lg">Connect</p>
                  </a>
                ) : (
                  <p className="text-lg text-slate-400">Login required</p>
                )}
              </div>
            </div>
          );
        })}
        {allPlatforms.length === 0 && (
          <p className="text-md text-slate-500 mt-2">No platforms to connect</p>
        )}
      </div>
    </div>
  );
}
