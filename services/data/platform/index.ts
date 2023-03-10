import prisma from "@/services/prisma";
import { DataAPIPayload } from "@/services/data/types";
import { isObjectID } from "@/utils";

export const getPlatforms = ({ payload, session, params }: DataAPIPayload) => {
  return prisma.platform.findMany();
};

export const getPlatform = ({ payload, session, params }: DataAPIPayload) => {
  const [id] = params;
  if (isObjectID(id) === false)
    throw new Error("id parameter is missing or invalid");

  return prisma.platform.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      queries: {
        select: {
          id: true,
          name: true,
          title: true,
          description: true,
        },
      },
    },
  });
};
