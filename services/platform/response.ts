import JSXRender from "@/utils/render";
import { trimChars } from "@/utils";
import { Connection, PlatformQueryConfig } from "@prisma/client";

export const getPlatformResponse = async (
  query: any,
  services: any,
  templates: any,
  connection: Connection | null,
  config: PlatformQueryConfig & { platformQuery: { name: string } }
) => {
  const {
    platformQuery: { name: method },
  } = config;

  if (Object.keys(services).includes(method) === false)
    return { success: false, status: 404, error: "Method not found" };

  const service = services[method];
  const template = templates[method];

  if (!service)
    return { success: false, status: 500, error: "Service not found" };
  if (!template)
    return { success: false, status: 500, error: "Template not found" };

  const response = await service(connection, config);

  if (response.success === false) {
    return { success: false, status: 500, error: response.error };
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
