import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { validations } from "@/platforms";
import prisma from "@/services/prisma";
import * as ConfigForm from "@/components/form";
import { redirect } from "next/navigation";

import {
  PlatformQuery,
  ConnectionProfile,
  Platform,
  PlatformQueryConfig,
} from "@prisma/client";
import { cn, mergeSchemas } from "@/utils";
import NextImage from "next/image";
import Link from "next/link";
import { AnyObject } from "yup";

export default async function Build({
  params,
}: {
  params: { ids: Array<string> };
}) {
  if (!params.ids || Array.isArray(params.ids) === false)
    return <p>Invalid params</p>;
  const [queryId, queryConfigId] = params.ids;
  const session = await getServerSession(authOptions);

  const query = await prisma.platformQuery.findUnique({
    where: { id: queryId },
    include: {
      platform: true,
      securedPlatformQuery: true,
      publicPlatformQuery: true,
    },
  });

  if (!query) return <p>Query not found</p>;

  let queryConfigs: Array<
    PlatformQueryConfig & {
      platform: Platform;
      platformQuery: PlatformQuery;
    }
  > = [];
  let connectionProfile: ConnectionProfile | null = null;

  if (session) {
    queryConfigs = await prisma.platformQueryConfig.findMany({
      where: {
        platformQueryId: queryId,
        userId: session.user.id,
      },
      include: { platform: true, platformQuery: true },
    });

    connectionProfile = await prisma.connectionProfile.findFirst({
      where: { platformId: query.platformId, userId: session.user.id },
    });
  }

  const platformValidations = validations[query.platform.code];
  const validation: { query: AnyObject; view: AnyObject } = {
    query:
      platformValidations.query[
        query.name as keyof typeof platformValidations.query
      ],
    view: platformValidations.view[
      query.name as keyof typeof platformValidations.view
    ],
  };
  const schema = mergeSchemas(validation.query, validation.view);
  const allowMultipleCreate = Object.keys(schema?.fields || {}).length > 0;

  if (allowMultipleCreate === false && !queryConfigId && queryConfigs.length) {
    return redirect(`/build/${queryId}/${queryConfigs[0].id}`);
  }

  const queryView = query.query_type.toLowerCase();

  return (
    <div className="flex mx-auto flex-col justify-center lg:w-2/3 px-8 lg:px-0">
      <div className="flex items-center flex-col container text-center mb-5">
        <p
          className={
            "text-4xl mr-2 font-bold text-slate-700 text-center w-fit bg-transparent dark:text-gray-200"
          }
        >
          {query.platform.name}
        </p>
        <p
          className={
            "text-2xl border-b-slate-400 border-b-[1px] pb-1 mt-2 mb-3 bg-transparent text-slate-700 text-center w-fit dark:text-gray-200 dark:border-b-gray-500"
          }
        >
          {query.title}
        </p>

        <blockquote className="text-slate-700 dark:text-gray-500">
          <p className="text-md">{query.description}</p>
        </blockquote>

        <div>
          <p className={cn("text-gray-500")}>
            {query.publicPlatformQuery?.id && (
              <Link
                href={`/build/${query.publicPlatformQuery.id}`}
                className="font-bold"
              >
                Switch to public query
              </Link>
            )}
            {query.securedPlatformQuery?.id && (
              <Link
                href={`/build/${query.securedPlatformQuery.id}`}
                className="font-bold"
              >
                Switch to secured query
              </Link>
            )}
          </p>
        </div>
      </div>

      {queryView === "public" && <ConfigForm.Public platformQuery={query} />}
      {queryView === "private" && (
        <>
          <ConfigForm.Private
            platformQuery={query}
            connectionProfile={connectionProfile}
            queryConfigs={queryConfigs || []}
            activeQueryConfigId={queryConfigId}
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
      <h2 className="text-2xl text-slate-600 font-bold border-b-slate-300 border-b-[1px] pb-2 mb-3 w-full dark:text-gray-300 dark:border-b-gray-600">
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
                className="rounded-lg border-[2px] border-slate-600 dark:border-gray-600"
              />
              <div className="flex justify-between items-center ml-3 flex-auto">
                <div>
                  <h3 className="text-xl text-slate-800 dark:text-gray-300">
                    {connectionProfile.name}
                  </h3>
                  <p className="text-slate-500">
                    {platformQuery.platform.name}
                  </p>
                </div>
                <Link
                  href="/connect"
                  className="text-sm text-slate-500 dark:text-gray-500"
                >
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
                href={`/api/oauth/connect/${platformQuery.platform.code}?redirect=${process.env.NEXT_PUBLIC_SITE_URL}/build/${platformQuery.id}`}
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
