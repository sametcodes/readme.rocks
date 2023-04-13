import prisma from "@/services/prisma";
import { DataAPIMethod } from "@/services/data/types";
import { isObjectID } from "@/utils";

import { shapeDataAPISchema } from "@/services/data/validations";
import * as validations from "@/services/data/validations";
import { PlatformQueryConfig, PlatformQuery, Platform } from "@prisma/client";

export const getPlatformQueryConfigs: DataAPIMethod<
  (PlatformQueryConfig & {
    platform: Platform;
    platformQuery: PlatformQuery;
  })[]
> = async ({ session, params }) => {
  return prisma.platformQueryConfig.findMany({
    where: { userId: session.user.id },
    include: {
      platform: true,
      platformQuery: true,
    },
  });
};

export const getPlatformQueryConfig: DataAPIMethod = async ({
  session,
  params,
}) => {
  const [platformQueryConfigId] = params;
  if (isObjectID(platformQueryConfigId) === false)
    throw new Error("id parameter is missing or invalid");

  const platformQueryConfig = await prisma.platformQueryConfig.findUnique({
    where: { id: platformQueryConfigId },
  });

  if (!platformQueryConfig) throw new Error("Unknown platform query config");
  return platformQueryConfig;
};

export const createPlatformQueryConfig: DataAPIMethod = async ({
  payload,
  params,
  session,
}) => {
  const [platformQueryId] = params;
  if (isObjectID(platformQueryId) === false)
    throw new Error("id parameter is missing or invalid");

  const platformQuery = await prisma.platformQuery.findFirst({
    where: { id: platformQueryId },
    include: { platform: true },
  });

  if (!platformQuery) throw new Error("Unknown platform query");

  await shapeDataAPISchema(
    platformQuery.platform.code,
    platformQuery.name,
    validations.createPlatformQueryConfig
  ).validate(payload, { strict: true });

  return prisma.platformQueryConfig.create({
    data: {
      queryConfig: payload.queryConfig,
      viewConfig: payload.viewConfig,

      platformQueryId,
      platformId: platformQuery.platformId,
      userId: session.user.id,
    },
  });
};

export const deletePlatformQueryConfig: DataAPIMethod = async ({
  payload,
  params,
  session,
}) => {
  const [configId] = params;
  if (isObjectID(configId) === false)
    throw new Error("id parameter is missing or invalid");

  const config = await prisma.platformQueryConfig.findFirst({
    where: { id: configId },
  });
  if (!config) throw new Error("Config not found");

  return prisma.platformQueryConfig
    .delete({ where: { id: config.id } })
    .then((res) => ({}));
};

export const editPlatformQueryConfig: DataAPIMethod = async ({
  payload,
  params,
  session,
}) => {
  const [configId] = params;
  if (isObjectID(configId) === false)
    throw new Error("id parameter is missing or invalid");

  const platformQueryConfig = await prisma.platformQueryConfig.findFirst({
    where: { id: configId },
    select: {
      id: true,
      platformQuery: { select: { name: true } },
      platform: { select: { code: true } },
    },
  });
  if (!platformQueryConfig) throw new Error("Unknown config.");

  await shapeDataAPISchema(
    platformQueryConfig.platform.code,
    platformQueryConfig.platformQuery.name,
    validations.editPlatformQueryConfig
  ).validate(payload, { strict: true });

  return prisma.platformQueryConfig.update({
    data: {
      queryConfig: payload.queryConfig,
      viewConfig: payload.viewConfig,
    },
    where: { id: platformQueryConfig.id },
  });
};
