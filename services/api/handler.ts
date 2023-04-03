import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Connection, PlatformQuery } from "@prisma/client";
import JSXRender from "@/utils/render";
import { trimChars } from "@/utils";
import { sendFallbackResponse } from "@/services/api/response";

type PlatformAPIHandler = (
  services: any,
  templates: any,
  query: PlatformQuery,
  config: any,
  connection?: Connection | null
) => NextApiHandler;

const handlePlatformAPI: PlatformAPIHandler = (
  services,
  templates,
  query,
  config,
  connection
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    console.log(query);
    const { name: queryName, query_type } = query;

    console.log({ queryName });

    if (Object.keys(services).includes(queryName) === false)
      return sendFallbackResponse(res, {
        title: "Query not found",
        message: "The query doesn't exist. This is not your fault.",
      });

    const service = services[queryName];
    const template = templates[queryName];

    if (!service)
      return sendFallbackResponse(res, {
        title: "Service not found",
        message:
          "The service function is missing or invalid. This is not your fault.",
      });
    if (!template)
      return sendFallbackResponse(res, {
        title: "Template not found",
        message: "The template is missing or invalid. This is not your fault.",
      });

    if (!connection && query_type === "Private") {
      return {
        success: false,
        fallback: {
          title: "Authentication required",
          message:
            "This query requires authentication. Please connect your account on the site to use this query.",
          code: 401,
        },
      };
    }

    const response = await service(connection, config);
    if (response.success === false)
      return sendFallbackResponse(res, {
        title: response?.fallback?.title || "Service returned an error",
        message:
          response?.fallback?.message ||
          "The service returned an error. Please check the provided parameters, and try again.",
      });

    const templateOutput = await template(response.data, config);
    if (!templateOutput)
      return sendFallbackResponse(res, {
        title: "Template is not implemented",
        message:
          "The template returned an empty result, it seems it's not implemented yet.",
      });

    const data = trimChars(JSXRender(templateOutput));
    res.setHeader("Content-Type", "image/svg+xml");
    return res.status(200).send(data);
  };
};

export default handlePlatformAPI;
