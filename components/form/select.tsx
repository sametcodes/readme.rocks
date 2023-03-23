"use client";

import { useState, useRef } from "react";
import { Platform, PlatformQuery } from "@prisma/client";
import { useRouter } from "next/navigation";
import { isObjectID } from "@/utils";

export const SelectQuery = ({
  platforms,
  platformId,
  queryId,
}: {
  platforms: (Platform & {
    queries: PlatformQuery[];
  })[];
  platformId: string;
  queryId: string;
}) => {
  const router = useRouter();

  const [selectedPlatformId, setSelectedPlatformId] =
    useState<string>(platformId);
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
      router.push(`/query/${values.queryId}`);
    }
  };

  const selectedPlatform = platforms.find(
    (platform) => platform.id === selectedPlatformId
  );
  return (
    <form
      className="flex flex-col items-center"
      ref={$form}
      onChange={onChange}
    >
      <select
        className="text-4xl mr-2 font-bold text-slate-700 text-center w-fit"
        name="platformId"
        defaultValue={selectedPlatformId}
      >
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>

      <select
        className="text-2xl border-b-slate-300 border-b-[1px] pb-1 mt-2 mb-3 text-slate-700 text-center w-fit"
        name="queryId"
        defaultValue={queryId}
      >
        <option>Select query</option>
        {selectedPlatform &&
          selectedPlatform.queries.map((query) => (
            <option key={query.id} value={query.id}>
              {query.title}
            </option>
          ))}
      </select>
    </form>
  );
};
