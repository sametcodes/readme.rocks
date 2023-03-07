import { ServiceResponse } from "@/services/platform/types";
import request from "@/services/platform/stackoverflow/request";
import { Connection } from "@prisma/client";

/**
 * @name getReputation
 * @title Get reputation
 * @description Get the total reputation of the user
 */
export const getReputation = async (
  connection: Connection
): Promise<ServiceResponse> => {
  const params = {
    site: "stackoverflow",
    order: "desc",
    sort: "reputation",
    filter: "default",
  };
  const response = await request("/me", connection, params);
  if ("error" in response) return response;

  return {
    success: true,
    data: { reputation: 5 },
    platform: "stackoverflow",
  };
};
