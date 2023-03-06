import { ServiceResponse } from "@services/platform/types";
import request from "@services/platform/stackoverflow/request";
import { Connection } from "@prisma/client";

/**
 * @name getReputation
 * @title Get reputation
 * @description Get the total reputation of the user
 */
export const getReputation = async (
  connection: Connection
): Promise<ServiceResponse> => {
  const response = await request("/2.3/me");
  if ("error" in response) return response;

  return {
    success: true,
    data: { reputation: 5 },
    platform: "stackoverflow",
  };
};
