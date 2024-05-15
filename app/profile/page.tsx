// "use client";

import prisma from "@/services/prisma";
import { Platform, PlatformCode, PlatformQuery } from "@prisma/client";
import { templates, samples } from "@/platforms";
import { RocksGridBuilder } from "@/components/widget/builder";

type IPlatformQueries = {
  platform: Platform & { queries: Array<PlatformQuery> };
};

const PlatformQueries = async ({ platform }: IPlatformQueries, key: string) => {
  const template = templates[platform.code];
  const sample = samples[platform.code];

  return Promise.all(
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
  if (!sampleData) return <>No data.</>;

  return getView(sampleData.result, sampleData.config);
};

type UserOwnProfileProps = { params: { uid: string } };
export default async function UserOwnProfile({ params }: UserOwnProfileProps) {
  const platforms = await prisma.platform.findMany({
    include: {
      queries: {
        where: { publicQueryId: { isSet: false } },
      },
    },
  });

  const rocksWithView = (
    await Promise.all(
      platforms.map((platform) => PlatformQueries({ platform }, platform.id))
    )
  ).flatMap((item) => item);

  return (
    <div className="container mx-auto flex">
      <div className="basis-1/4 w-16">
        <p>User profile</p>
      </div>
      <div className="basis-3/4 w-32">
        <RocksGridBuilder rocks={rocksWithView} />
      </div>
    </div>
  );
}
