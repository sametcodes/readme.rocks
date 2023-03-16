"use client";

import { Fragment } from "react";

import { Platform, PlatformQuery, PlatformQueryConfig } from "@prisma/client";

import Link from "next/link";

type IQueryList = {
  platforms: (Platform & {
    queries: PlatformQuery[];
  })[];
  configs: (PlatformQueryConfig & {
    platform: Platform;
    platformQuery: PlatformQuery;
  })[];
};

export default function QueryList({ platforms, configs }: IQueryList) {
  const onClickDelete = async (id: any) => {
    try {
      const res = await fetch(`/api/data/deletePlatformQueryConfig/${id}`, {
        method: "GET",
      });
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {platforms.map((platform: Platform & { queries: PlatformQuery[] }) => {
        return (
          <div key={platform.id} className="my-12">
            <h2 className="text-2xl border-b-2 border-gray-300 inline-block">
              {platform.name}
            </h2>
            <ul>
              {platform.queries.map((query, index) => {
                return (
                  <Fragment key={query.id}>
                    <li className="flex justify-between my-3 items-center">
                      <div className="flex flex-col w-full">
                        <span className="text-lg font-medium">
                          {query.title}
                        </span>
                        <span className="text-sm max-w-[90%]">
                          {query.description}
                        </span>
                      </div>
                      <span>
                        {configs.find(
                          (config) => config.platformQueryId === query.id
                        ) ? (
                          <div className="flex gap-3">
                            <Link
                              href={`/query/${query.id}`}
                              className="cursor-pointer"
                            >
                              View/Edit
                            </Link>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                const config = configs.find(
                                  (config) =>
                                    config.platformQueryId === query.id
                                );
                                if (!config) return;
                                onClickDelete(config.id);
                              }}
                            >
                              Delete
                            </span>
                          </div>
                        ) : (
                          <Link href={`/query/${query.id}`}>Create</Link>
                        )}
                      </span>
                    </li>
                    {(index !== platform.queries.length - 1 && (
                      <hr className="border-slate-200" />
                    )) ||
                      ""}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}
