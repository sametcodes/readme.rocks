import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPlatformQueryConfigs } from "@/services/data";
import prisma from "@/services/prisma";
import QueryList from "@/components/querylist";

export default async function QueriesPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <h1>Not signed in</h1>
        <p>Sign in to view your configs</p>
      </div>
    );
  }

  const configs = await getPlatformQueryConfigs({
    session,
    params: [],
    payload: {},
  });

  const platforms = await prisma.platform.findMany({
    include: { queries: true },
  });

  return (
    <div className="flex container mx-auto flex-col">
      <div className="w-full mx-auto lg:w-1/2 mt-3 mb-5">
        <h1 className="text-3xl font-bold my-3 text-slate-700">Queries</h1>
        <blockquote className="text-slate-700">
          <p className="text-md">
            Queries are used to fetch data from the platform. You can create a
            query for each platform and get an SVG data.
          </p>
        </blockquote>
      </div>

      <div className="w-full mx-auto lg:w-1/2">
        <QueryList platforms={platforms} configs={configs} />
      </div>
    </div>
  );
}
