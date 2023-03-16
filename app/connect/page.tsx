import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import actions from "@/services/oauth/actions";
import Link from "next/link";

import Image from "next/image";
import prisma from "@/services/prisma";

export default async function Connect() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <h1>Connect</h1>
        <p>You must be signed in to connect your accounts.</p>
      </div>
    );
  }
  const activeConnections = await actions.getAllConnections({ session });
  const platforms = await prisma.platform.findMany({
    where: { require_auth: true },
  });

  const allPlatforms = platforms.filter((platform) => {
    return !activeConnections.find(
      (connection) => connection.platform.code === platform.code
    );
  });

  return (
    <div className="flex container mx-auto flex-col">
      <div className="w-full mx-auto lg:w-1/2 mt-3 mb-5">
        <h1 className="text-3xl font-bold my-3 text-slate-700">Connects</h1>
        <blockquote className="text-slate-700">
          <p className="text-md">
            Connect your accounts to fetch data from platforms.
          </p>
        </blockquote>
      </div>

      <div className="w-full mx-auto lg:w-1/2 mt-[40px]">
        <h2 className="text-2xl font-bold text-slate-700">
          Connected Platforms ({activeConnections.length})
        </h2>
        {activeConnections.map((activeConnection) => {
          return (
            <div key={activeConnection.id} className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-xl inline-block">
                  {activeConnection.platform.name}
                </h2>
                <a
                  href={`/api/oauth/disconnect/${activeConnection.platform.code}`}
                >
                  <p className="text-xl">Disconnect</p>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full mx-auto lg:w-1/2 mt-[40px]">
        <h2 className="text-2xl font-bold text-slate-700">
          All platforms ({allPlatforms.length})
        </h2>
        {allPlatforms.map((platform) => {
          return (
            <div key={platform.id} className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-xl inline-block">{platform.name}</h2>
                <a href={`/api/oauth/connect/${platform.code}`}>
                  <p className="text-xl">Connect</p>
                </a>
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
