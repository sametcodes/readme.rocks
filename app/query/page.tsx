import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPlatformQueryConfigs } from "@/services/data";
import prisma from "@/services/prisma";
import QueryList from "@/components/querylist";
import { Platform, PlatformQueryConfig, PlatformQuery } from "@prisma/client";

export default async function QueriesPage() {
  const session = await getServerSession(authOptions);

  let configs: (PlatformQueryConfig & {
      platform: Platform;
      platformQuery: PlatformQuery;
    })[] = [],
    platforms: (Platform & {
      queries: PlatformQuery[];
    })[] = [];

  if (session) {
    configs = await getPlatformQueryConfigs({
      session,
      params: [],
      payload: {},
    });

    platforms = await prisma.platform.findMany({
      include: { queries: true },
    });
  }

  return (
    <div className="flex container flex-col w-full mx-auto px-8 lg:px-0 lg:w-1/2">
      <div className="mb-5">
        <h1 className="text-3xl font-bold my-3 text-slate-700">Queries</h1>
        <blockquote className="text-slate-700">
          <p className="text-md">
            Queries are used to fetch data from the platform. You can create a
            query for each platform and get an SVG data.
          </p>
        </blockquote>
      </div>

      {session ? (
        <div>
          <QueryList platforms={platforms} configs={configs} />
        </div>
      ) : (
        <>
          <p className="text-lg text-slate-500 border-t-[1px] inline-block border-t-slate-300 pt-3">
            Please login to see the platform queries.
          </p>
        </>
      )}
    </div>
  );
}
