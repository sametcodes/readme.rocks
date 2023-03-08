import prisma from "@/services/prisma";
import { DataAPIMethod } from "@/services/data/types";
import { isObjectID } from "../../../utils/index";

export const getPlatformQueryConfigs: DataAPIMethod = ({ session, params }) => {
  return prisma.platformQueryConfig.findMany({
    where: { userId: session.user.id },
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
  });
  if (!platformQueryConfig) throw new Error("Unknown config.");

  return prisma.platformQueryConfig.update({
    data: {
      queryConfig: payload.queryConfig,
      platformConfig: payload.platformConfig,
      viewConfig: payload.viewConfig,
    },
    where: { id: platformQueryConfig.id },
  });
};
