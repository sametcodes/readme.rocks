import prisma from "@/services/prisma";
import { DataAPIMethod } from "@/services/data/types";
import { isObjectID } from "@/utils";

import { shapeDataAPISchema } from "@/services/data/validations";
import * as validations from "@/services/data/validations";

export const getPlatformQueryConfigs: DataAPIMethod = ({ session, params }) => {
  return prisma.platformQueryConfig.findMany({
    where: { userId: session.user.id },
  });
};

export const getPlatformQueryConfig: DataAPIMethod = ({ session, params }) => {
  const [platformQueryConfigId] = params;
  if (isObjectID(platformQueryConfigId) === false)
    throw new Error("id parameter is missing or invalid");

  return prisma.platformQueryConfig.findUnique({
    where: { id: platformQueryConfigId },
  });
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
  });

  if (!platformQuery) throw new Error("Unknown platform query");

  await shapeDataAPISchema(
    validations.createPlatformQueryConfig,
    platformQuery.name
  ).validate(payload, { strict: true });

  return prisma.platformQueryConfig.create({
    data: {
      queryConfig: payload.queryConfig,
      platformConfig: payload.platformConfig,
      viewConfig: payload.viewConfig,

      platformQueryId: platformQueryId,
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
    },
  });
  if (!platformQueryConfig) throw new Error("Unknown config.");

  await shapeDataAPISchema(
    validations.editPlatformQueryConfig,
    platformQueryConfig.platformQuery.name
  ).validate(payload, { strict: true });

  return prisma.platformQueryConfig.update({
    data: {
      queryConfig: payload.queryConfig,
      platformConfig: payload.platformConfig,
      viewConfig: payload.viewConfig,
    },
    where: { id: platformQueryConfig.id },
  });
};
