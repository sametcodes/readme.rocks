import prisma from "@/services/prisma";
import { DataAPIPayload } from "@/services/data/types";
import { isObjectID } from "@/utils";

import * as queryValidations from "@/services/platform/validations";
import * as viewValidations from "@/components/view/validations";
import { DataAPIMethod } from "../types";
import handlePlatformAPI from "@/services/api/handler";
import { getPlatformResponse } from "@/services/platform/response";

export const getAllPlatformQueries = ({
  payload,
  session,
  params,
}: DataAPIPayload) => {
  return prisma.platformQuery.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      platform: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getPlatformQueries = async ({
  payload,
  session,
  params,
}: DataAPIPayload) => {
  const [platformId] = params;
  if (isObjectID(platformId) === false)
    throw new Error("id parameter is missing or invalid");

  const userPlatformQueryIDs = await prisma.platformQueryConfig
    .findMany({
      where: { userId: session?.user?.id },
      select: { platformQueryId: true },
    })
    .then((res) => res.map((r) => r.platformQueryId));

  return prisma.platformQuery
    .findMany({
      where: { platformId },
      select: {
        id: true,
        name: true,
        title: true,
        description: true,
        platform: {
          select: {
            name: true,
          },
        },
      },
    })
    .then((res) => res.filter((r) => !userPlatformQueryIDs.includes(r.id)));
};

export const previewQuery = async ({
  payload,
  session,
  params,
}: DataAPIPayload) => {
  const [platformQueryId] = params;
  const platformQuery = await prisma.platformQuery.findFirst({
    where: { id: platformQueryId },
    select: {
      name: true,
      platform: {
        select: { code: true },
      },
    },
  });

  throw new Error("Not implemented");
};
