import { ServiceResponse } from "@services/platform/types";
import request from "@services/platform/wakatime/request";
import { WakatimeUserConfig } from "@services/platform/types";
import { Connection } from "@prisma/client";

/**
 * @name getAllTimeSinceToday
 * @title Get All Time Since Today
 * @description Get overall time since today
 */
export const getAllTimeSinceToday = async (
  userConfig: WakatimeUserConfig,
  connection: Connection
): Promise<ServiceResponse> => {
  const response = await request(
    "/users/current/all_time_since_today",
    connection.access_token as string
  );
  if ("error" in response) return response;

  return { success: true, data: response.data.data, platform: "wakatime" };
};
