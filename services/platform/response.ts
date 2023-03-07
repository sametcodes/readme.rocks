import JSXRender from "@/utils/render";
import { trimChars } from "@/utils";
import { Connection } from "@prisma/client";

export const getPlatformResponse = async (
  query: any,
  services: any,
  templates: any,
  connection: Connection | null,
  userConfig: any | undefined
) => {
  const { method, returnType } = query;
  if (method === undefined || typeof method !== "string")
    return {
      success: false,
      status: 400,
      error: "Bad Request: missing method parameter",
    };
  if (returnType && Array.isArray(returnType))
    return {
      success: false,
      status: 400,
      error: "Bad Request: returnType must be a string",
    };

  if (
    typeof returnType === "string" &&
    ["json", "svg"].includes(returnType) === false
  ) {
    return {
      success: false,
      status: 400,
      error: "Bad Request: invalid value for returnType parameter",
    };
  }

  if (Object.keys(services).includes(method) === false)
    return { success: false, status: 404, error: "Method not found" };

  const service = services[method];
  const template = templates[method];

  if (!service)
    return { success: false, status: 500, error: "Service not found" };
  if (!template)
    return { success: false, status: 500, error: "Template not found" };

  const response = await service(connection, userConfig);

  if (response.success === false) {
    return { success: false, status: 500, error: response.error };
  }

  if (returnType === "json") {
    return {
      success: true,
      status: 200,
      data: JSON.stringify(response.data),
      contentType: "application/json",
    };
  }

  const templateOutput = template(response.data, response.platform);
  if (!templateOutput)
    return { success: false, status: 500, error: "Template output is empty" };

  return {
    success: true,
    status: 200,
    data: trimChars(JSXRender(templateOutput)),
    contentType: "image/svg+xml",
  };
};
