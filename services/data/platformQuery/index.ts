import prisma from "@/services/prisma";
import { DataAPIPayload } from "@/services/data/types";
import { isObjectID } from "@/utils";

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

  return prisma.platformQuery.findMany({
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
  });
};
