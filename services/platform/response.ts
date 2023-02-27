export const getPlatformResponse = async (
  query: any,
  services: any,
  templates: any,
  userConfig: any
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

  const response = await service(userConfig);

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

  return {
    success: true,
    status: 200,
    data: trimChars(template(response.data, response.platform)),
    contentType: "image/svg+xml",
  };
};

const trimChars = (body: string) => {
  return body.replace(/[\t|\n]/g, "").replace(/  /g, "");
};
