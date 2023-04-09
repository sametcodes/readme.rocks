"use client";

import { useState, useRef } from "react";
import { Platform, PlatformQuery } from "@prisma/client";
import { useRouter } from "next/navigation";
import { isObjectID } from "@/utils";
import { Session } from "next-auth";

export const SelectQuery = ({
  platforms,
  platformId,
  queryId,
  session,
}: {
  platforms: (Platform & {
    queries: PlatformQuery[];
  })[];
  platformId: string | undefined;
  queryId: string | undefined;
  session?: Session | null;
}) => {
  const router = useRouter();

  const [selectedPlatformId, setSelectedPlatformId] = useState<
    string | undefined
  >(platformId);
  const $form = useRef<HTMLFormElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!$form.current) return;
    const formData = new FormData($form.current);
    const values = Object.fromEntries(formData);

    if (event.target.name === "platformId") {
      setSelectedPlatformId(values.platformId as string);
    }

    if (event.target.name === "queryId") {
      if (!isObjectID(values.queryId as string)) return;
      router.push(`/build/${values.queryId}`);
    }
  };

  const selectedPlatform = platforms.find(
    (platform) => platform.id === selectedPlatformId
  );
  const queries = !session
    ? (selectedPlatform?.queries || []).filter(
        (query) => query.query_type === "Public"
      )
    : selectedPlatform?.queries || [];
  return (
    <form
      className="flex flex-col items-center"
      ref={$form}
      onChange={onChange}
    >
      <select
        className="text-4xl mr-2 font-bold text-slate-700 text-center w-fit bg-transparent dark:text-gray-200"
        name="platformId"
        defaultValue={selectedPlatformId}
      >
        <option>Select platform</option>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}{" "}
            {!session
              ? `(${
                  platform.queries.filter(
                    (query) => query.query_type === "Public"
                  ).length
                })`
              : `(${platform.queries.length})
          `}
          </option>
        ))}
      </select>

      <select
        className="text-2xl border-b-slate-300 border-b-[1px] pb-1 mt-2 mb-3 bg-transparent text-slate-700 text-center w-fit  dark:text-gray-200 dark:border-b-gray-500"
        name="queryId"
        disabled={!selectedPlatformId || queries.length === 0}
        defaultValue={queryId}
      >
        {queries.length === 0 && !session ? (
          <option>No queries available</option>
        ) : (
          <>
            <option>Select query</option>
            {selectedPlatform &&
              queries.map((query) => (
                <option key={query.id} value={query.id}>
                  {query.title}
                </option>
              ))}
          </>
        )}
      </select>
    </form>
  );
};
