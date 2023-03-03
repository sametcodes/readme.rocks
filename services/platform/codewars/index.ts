import { ServiceResponse } from "@services/platform/types";
import * as request from "@services/platform/request";
import { CodewarsUserConfig } from "@services/platform/types";

/**
 * @name getUser
 * @title Get user details
 * @description Get a summary of your scores and top languages
 */
export const getUser = async (
  userConfig: CodewarsUserConfig
): Promise<ServiceResponse> => {
  const response = await request.codewars(`/users/${userConfig.username}`);
  if ("error" in response) return response;

  const challanges = response.data;
  return { success: true, data: challanges, platform: "codewars" };
};
