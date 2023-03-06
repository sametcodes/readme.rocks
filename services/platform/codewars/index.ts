import { ServiceResponse } from "@services/platform/types";
import request from "@services/platform/codewars/request";
import { CodewarsUserConfig } from "@services/platform/types";
import { Connection } from "@prisma/client";

/**
 * @name getUser
 * @title Get user details
 * @description Get a summary of your scores and top languages
 */
export const getUser = async (
  connection: Connection,
  userConfig: CodewarsUserConfig
): Promise<ServiceResponse> => {
  const response = await request(`/users/${userConfig.username}`);
  if ("error" in response) return response;

  const challanges = response.data;
  return { success: true, data: challanges, platform: "codewars" };
};
