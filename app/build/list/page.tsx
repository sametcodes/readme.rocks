import prisma from "@/services/prisma";
import { Platform, PlatformCode, PlatformQuery } from "@prisma/client";
import { templates, samples } from "@/platforms";
import Link from "next/link";

export default async function QueryList() {
  const platforms = await prisma.platform.findMany({
    include: {
      queries: {
        where: { publicQueryId: { isSet: false } },
      },
    },
  });

  const view = await Promise.all(
    platforms.map((platform) => PlatformQueries({ platform }, platform.id))
  );
  return (
    <div className="flex mx-auto flex-col justify-center lg:w-2/3 px-8 lg:px-0">
      {view}
    </div>
  );
}

type IPlatformQueries = {
  platform: Platform & { queries: Array<PlatformQuery> };
};

const PlatformQueries = async ({ platform }: IPlatformQueries, key: string) => {
  const template = templates[platform.code];
  const sample = samples[platform.code];

  const view = await Promise.all(
    platform.queries.map((query) =>
      PlatformQueryView(
        {
          query,
          template: template as any,
          sample: sample as any,
        },
        query.id
      )
    )
  );
  return (
    <div className="my-3" key={key}>
      <h2 className="text-2xl border-b-1 border-gray-500 inline-block">
        {platform.name}
      </h2>
      <ul className="flex flex-col flex-wrap items-start">{view}</ul>
    </div>
  );
};

type IPlatformQueryView = {
  query: PlatformQuery;
  template: {
    [key in keyof typeof PlatformCode]: (
      ...params: any
    ) => Promise<JSX.Element>;
  };
  sample: { [key in keyof typeof PlatformCode]: any };
};

const PlatformQueryView = async (
  { query, template, sample }: IPlatformQueryView,
  key: string
) => {
  const getView = template[query.name as keyof typeof template];
  const sampleData = sample[query.name as keyof typeof samples];
  if (!sampleData) return <></>;

  const view = await getView(sampleData.result, sampleData.config);
  return (
    <li key={key} className="flex justify-between my-3 items-center">
      <Link href={`/build/${query.id}`}>
        <div className="flex flex-col w-full justify-end items-end opacity-80 hover:opacity-100 cursor-pointer">
          <div>{view}</div>
          <div className="flex w-[calc(100%-2rem)] justify-between mx-4">
            <div className="flex gap-2">
              {query.query_type === "Private" && (
                <span className="text-sm text-gray-400">Auth required</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export const dynamic = "force-static";
export const revalidate = false;
