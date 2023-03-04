import { ServiceResponse } from "@services/platform/types";
import request from "@services/platform/stackoverflow/request";
import { StackoverflowUserConfig } from "@services/platform/types";

/**
 * @name getReputation
 * @title Get reputation
 * @description Get the total reputation of the user
 */
export const getReputation = async (
  userConfig: StackoverflowUserConfig
): Promise<ServiceResponse> => {
  if (!userConfig.userId)
    return {
      success: false,
      error: {
        message: "User ID is missing in the user configuration",
        code: 400,
      },
    };

  const response = await request(
    `/users/${userConfig.userId}/reputation?site=stackoverflow`
  );
  if ("error" in response) return response;

  const reputation = response.data.items.reduce(
    (acc: number, el: any) => acc + el.reputation_change,
    0
  );

  return {
    success: true,
    data: { reputation },
    platform: "stackoverflow",
  };
};
