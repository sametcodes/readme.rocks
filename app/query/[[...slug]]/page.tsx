import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as ConfigForm from "@/components/form";
import prisma from "@/services/prisma";

import { PlatformQuery, ConnectionProfile, Platform } from "@prisma/client";
import NextImage from "next/image";
import { SelectQuery } from "@/components/form/select";
import Link from "next/link";

export default async function EditQueryConfig({
  params,
}: {
  params: { slug: string[] };
}) {
  const [query_id] = params.slug || [];
  const session = await getServerSession(authOptions);

  const platforms = await prisma.platform.findMany({
    include: { queries: true },
  });

  if (!query_id)
    return (
      <div className="flex mx-auto flex-col justify-center lg:w-2/3 px-8 lg:px-0">
        <div className="container text-center mb-5">
          <SelectQuery
            session={session}
            platforms={platforms}
            platformId={undefined}
            queryId={undefined}
          />
          <p className="text-slate-400">
            Login to see non-public and more queries.
          </p>
        </div>
      </div>
    );

  const query = await prisma.platformQuery.findUnique({
    where: { id: query_id },
    include: { platform: true },
  });

  if (!query) return <p>Query not found</p>;

  let queryConfig,
    connectionProfile: ConnectionProfile | null = null;

  if (session) {
    queryConfig = await prisma.platformQueryConfig.findFirst({
      where: {
        platformQueryId: query_id,
        userId: session.user.id,
      },
      include: { platform: true, platformQuery: true },
    });

    connectionProfile = await prisma.connectionProfile.findFirst({
      where: { platformId: query.platformId, userId: session.user.id },
    });
  }

  const query_view = query.query_type.toLowerCase();

  return (
    <div className="flex mx-auto flex-col justify-center lg:w-2/3 px-8 lg:px-0">
      <div className="container text-center mb-5">
        <SelectQuery
          platforms={platforms}
          platformId={query.platformId}
          queryId={query.id}
          session={session}
        />

        <blockquote className="text-slate-700">
          <p className="text-md">{query.description}</p>
        </blockquote>
      </div>

      {query_view === "public" && <ConfigForm.Public platformQuery={query} />}

      {query_view === "private" && (
        <>
          <ConfigForm.Private
            platformQuery={query}
            connectionProfile={connectionProfile}
            queryConfig={queryConfig || undefined}
          >
            <ConnectAccount
              platformQuery={query}
              connectionProfile={connectionProfile}
            />
          </ConfigForm.Private>
        </>
      )}
    </div>
  );
}

const ConnectAccount = ({
  platformQuery,
  connectionProfile,
}: {
  platformQuery: PlatformQuery & { platform: Platform };
  connectionProfile: ConnectionProfile | null;
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl text-slate-600 font-bold border-b-slate-300 border-b-[1px] pb-2 mb-3 w-full">
        Connected account
      </h2>
      <div className="flex flex-row gap-2">
        <div className="w-full">
          {connectionProfile ? (
            <div className="flex items-center">
              <NextImage
                src={connectionProfile.image}
                alt={connectionProfile.name || ""}
                width={50}
                height={50}
                className="rounded-lg border-[2px] border-slate-600"
              />
              <div className="flex justify-between items-center ml-3 flex-auto">
                <div>
                  <h3 className="text-xl text-slate-800">
                    {connectionProfile.name}
                  </h3>
                  <p className="text-slate-500">
                    {platformQuery.platform.name}
                  </p>
                </div>
                <Link href="/connect" className="text-sm text-slate-500">
                  Manage connections
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-slate-500 text-md leading-6 mb-5">
                This query provides private statistics, and requires a
                connection to your {platformQuery.platform.name} account.
              </p>
              <a
                href={`/api/oauth/connect/${platformQuery.platform.code}?redirect=${process.env.NEXT_PUBLIC_SITE_URL}/query/${platformQuery.id}`}
                className="bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200 border rounded-lg py-2 px-4"
              >
                Connect your {platformQuery.platform.name} account
              </a>
              <p className="text-slate-400 mt-5 text-sm">
                You can get your private stats without exposing any credentials.
                After connecting your account, you will get a unique link for
                each query.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
