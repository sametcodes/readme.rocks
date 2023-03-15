import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ConfigForm from "@/components/form";
import prisma from "@/services/prisma";

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

  return (
    <div className="flex mx-auto flex-col">
      <div className="w-full container text-center mx-auto lg:w-1/2 mt-[50px] mb-5">
        <h1 className="text-4xl mr-2 font-bold text-slate-700 ">
          {query.platform.name}
        </h1>
        <h2 className="text-2xl border-b-slate-700 border-b-[1px] inline-block pb-1 mt-2 mb-3 text-slate-700">
          {query.title}
        </h2>
        <blockquote className="text-slate-700">
          <p className="text-md">{query.description}</p>
        </blockquote>
      </div>

      <div className="w-full mx-auto lg:w-2/3">
        {queryConfig ? (
          <ConfigForm platformQuery={query} queryConfig={queryConfig} />
        ) : (
          <ConfigForm platformQuery={query} />
        )}
      </div>
    </div>
  );
}
