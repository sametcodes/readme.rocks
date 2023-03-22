import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as ConfigForm from "@/components/form";
import prisma from "@/services/prisma";

import { PlatformQuery, ConnectionProfile, Platform } from "@prisma/client";
import NextImage from "next/image";

export default async function EditQueryConfig({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Not signed in</p>;

  const query = await prisma.platformQuery.findUnique({
    where: { id: params.id },
    include: { platform: true },
  });

  if (!query) return <p>Query not found</p>;

  const queryConfig = await prisma.platformQueryConfig.findFirst({
    where: {
      platformQueryId: params.id,
      userId: session.user.id,
    },
    include: { platform: true, platformQuery: true },
  });

  const connectionProfile = await prisma.connectionProfile.findFirst({
    where: { platformId: query.platformId, userId: session.user.id },
  });

  const query_view = query.query_type.toLowerCase();

  return (
    <div className="flex mx-auto flex-col justify-center lg:w-2/3 px-8 lg:px-0">
      <div className="container text-center mb-5">
        <h1 className="text-4xl mr-2 font-bold text-slate-700 ">
          {query.platform.name}
        </h1>
        <h2 className="text-2xl border-b-slate-700 border-b-[1px] inline-block pb-1 mt-2 mb-3 text-slate-700">
          {query.title}
        </h2>
        <blockquote className="text-slate-700">
          <p className="text-md">{query.description}</p>
        </blockquote>

        {query_view === "private" && (
          <ConnectAccount {...{ platformQuery: query, connectionProfile }} />
        )}
      </div>

      {query_view === "public" && (
        <ConfigForm.Public
          {...{
            platformQuery: query,
            queryConfig: queryConfig || undefined,
            connectionProfile,
          }}
        />
      )}

      {query_view === "private" && (
        <>
          <ConfigForm.Private
            {...{
              platformQuery: query,
              queryConfig: queryConfig || undefined,
              connectionProfile,
            }}
          />
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
    <div className="flex text-center flex-col max-w-[500px] items-center mx-auto my-5">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1">
          {connectionProfile ? (
            <div>
              <div className="flex items-center">
                <NextImage
                  src={connectionProfile.image}
                  alt={connectionProfile.name || ""}
                  width={50}
                  height={50}
                  className="rounded-lg border-[2px] border-slate-600"
                />
                <div className="ml-3">
                  <h3 className="text-xl text-slate-800">
                    {connectionProfile.name}
                  </h3>
                  <a
                    className="text-slate-500"
                    href={`/api/oauth/disconnect/${platformQuery.platform.code}`}
                  >
                    Disconnect
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <a
              href={`/api/oauth/connect/${platformQuery.platform.code}`}
              className="bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200 border rounded-lg py-2 px-4"
            >
              Connect your {platformQuery.platform.name} account
            </a>
          )}
        </div>
      </div>
      <p className="text-slate-500 my-3 text-sm">
        You can get your private stats without exposing any credentials, if you
        connect your account. After connecting your account, you can get a
        unique link for each query.
      </p>
    </div>
  );
};
