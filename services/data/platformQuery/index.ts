import prisma from "@/services/prisma";
import { DataAPIPayload } from "@/services/data/types";

export const getPlatformQueries = ({
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
