import prisma from "@services/prisma";
import { DataAPIMethod } from "@services/data/types";

export const getUserConfigs: DataAPIMethod = ({ session }) => {
  return prisma.config.findMany({
    select: {
      value: true,
      platform: {
        select: {
          name: true,
        },
      },
    },
    where: { userId: session.user.id },
  });
};

export const createConfig: DataAPIMethod = async ({ payload, session }) => {
  const platform = await prisma.platform.findFirst({
    where: { code: payload.platform },
  });
  if (!platform) throw new Error("Unknown platform");

  const existingConfig = await prisma.config.count({
    where: { platformId: platform.id, userId: session.user.id },
  });

  if (existingConfig) {
    throw new Error(
      "You already have a config for this platform, please update it instead of creating a new one."
    );
  }

  return prisma.config.create({
    data: {
      value: payload.value,
      platformId: platform.id,
      userId: session.user.id,
    },
  });
};

export const editConfig: DataAPIMethod = async ({ payload, session }) => {
  const platform = await prisma.platform.findFirst({
    where: { code: payload.platform },
  });
  if (!platform) throw new Error("Unknown platform");

  const existingConfig = await prisma.config.findFirst({
    where: { platformId: platform.id, userId: session.user.id },
  });

  if (!existingConfig) {
    throw new Error(
      "You don't have a config for this platform, please create one first."
    );
  }

  return prisma.config.update({
    data: { value: payload.value },
    where: { id: existingConfig.id },
  });
};
