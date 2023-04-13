"use client";

import { Session } from "next-auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert";
import { useRef } from "react";
import { Platform } from "@prisma/client";
import { IConnectionWithPlatforms } from "@/app/connect/page";

type IConnects = {
  session: Session | null;
  connectionWithPlatforms: IConnectionWithPlatforms[];
  noAuthRequiredPlatforms: (Platform & {
    _count: { queries: number };
  })[];
  allPlatforms: (Platform & {
    _count: { queries: number };
  })[];
};

export const Connects: React.FC<IConnects> = ({
  session,
  connectionWithPlatforms,
  noAuthRequiredPlatforms,
  allPlatforms,
}) => {
  const confirmationLink = useRef<string>();

  const onClickDisconnect = (link: string) => {
    confirmationLink.current = link;
  };

  const onDisconnect = () => {
    if (!confirmationLink.current) return;
    window.location = confirmationLink.current as unknown as Location;
  };

  const alertContent = (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure sure?</AlertDialogTitle>
        <AlertDialogDescription>
          If you disconnect your account, all the queries that require
          authentication will return an error view on the sites that it is used.
          If you connect your account again, the queries will work again without
          require any action.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onDisconnect}>Disconnect</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );

  return (
    <AlertDialog>
      {alertContent}
      <div className="flex container mx-auto flex-col">
        <div className="mb-5">
          <h1 className="text-3xl font-bold my-3 text-slate-700 dark:text-gray-300">
            Connections
          </h1>
          <blockquote className="text-slate-700">
            <p className="text-md dark:text-gray-400">
              Connect your accounts to fetch data from platforms.
            </p>
          </blockquote>
        </div>

        {session && (
          <div className="mt-[40px]">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-gray-300">
              Connected Platforms (
              {connectionWithPlatforms.length + noAuthRequiredPlatforms.length})
            </h2>
            {connectionWithPlatforms.map((connection) => {
              return (
                <div key={connection.id} className="mt-6">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h2 className="text-xl inline-block dark:text-gray-300">
                        {connection.platform.name}
                      </h2>
                      <span className="text-sm text-slate-400">
                        {connection.platform._count.queries} available{" "}
                        {connection.platform._count.queries === 1
                          ? "query"
                          : "queries"}
                      </span>
                    </div>
                    <AlertDialogTrigger
                      onClick={() =>
                        onClickDisconnect(
                          `/api/oauth/disconnect/${connection.platform.code}`
                        )
                      }
                    >
                      <p className="text-lg">Disconnect</p>
                    </AlertDialogTrigger>
                  </div>
                </div>
              );
            })}
            {noAuthRequiredPlatforms.map((platform) => {
              return (
                <div key={platform.id} className="mt-6">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h2 className="text-xl inline-block dark:text-gray-300">
                        {platform.name}
                      </h2>
                      <span className="text-sm text-slate-400">
                        {platform._count.queries} available{" "}
                        {platform._count.queries === 1 ? "query" : "queries"}
                      </span>
                    </div>
                    <p className="text-lg text-slate-400 dark:text-gray-500">
                      No auth required
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-[40px]">
          <h2 className="text-2xl font-bold text-slate-700 dark:text-gray-300">
            All platforms ({allPlatforms.length})
          </h2>
          {allPlatforms.map((platform) => {
            return (
              <div key={platform.id} className="mt-6">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-xl inline-block">{platform.name}</h2>
                    <span className="text-sm text-slate-400">
                      {platform._count.queries} available queries
                    </span>
                  </div>
                  {session ? (
                    <a href={`/api/oauth/connect/${platform.code}`}>
                      <p className="text-lg">Connect</p>
                    </a>
                  ) : (
                    <p className="text-lg text-slate-400">Login required</p>
                  )}
                </div>
              </div>
            );
          })}
          {allPlatforms.length === 0 && (
            <p className="text-md text-slate-500 mt-2">
              No platforms to connect
            </p>
          )}
        </div>
      </div>
    </AlertDialog>
  );
};
