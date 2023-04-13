import { Platform, PlatformCode, PlatformQuery } from "@prisma/client";
import { templates, samples } from "@/platforms";
import Link from "next/link";

type IPlatformQueries = {
  platform: Platform & { queries: PlatformQuery[] };
};

const PlatformQueryList = async (
  { platform }: IPlatformQueries,
  key: string
) => {
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
  const sample_data = sample[query.name as keyof typeof samples];
  if (!sample_data) return <></>;

  const view = await getView(sample_data.result, sample_data.config);
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

export default PlatformQueryList;
