import { testApiHandler } from "next-test-api-route-handler";
import handlePlatformAPI from "@/services/api/handler";

import { encode } from "querystring";

import * as services from "@/platforms/wakatime/query";
import * as templates from "@/platforms/wakatime/view";

const handler = handlePlatformAPI(services, templates, "", {});
const methods = Object.keys(services);

describe("Wakatime Platform APIs", () => {
  methods.forEach((method) => {
    test(`/api/platform/wakatime?method=${method}`, async () => {
      await testApiHandler({
        handler,
        requestPatcher: (req) => {
          req.url = `/api/platform/wakatime?${encode({
            method,
            uid: "6405534466df6b87ed0adb53",
          })}`;
        },
        test: async ({ fetch }) => {
          const res = await fetch({ method: "GET" });
          expect(res.status).toBe(200);

          const xml = await res.text();
          expect(xml.indexOf("<svg")).toBe(0);
        },
      });
    });

    test(`/api/platform/wakatime?method=${method}&returnType=json`, async () => {
      await testApiHandler({
        handler,
        requestPatcher: (req) => {
          req.url = `/api/platform/wakatime?${encode({
            method,
            uid: "6405534466df6b87ed0adb53",
            returnType: "json",
          })}`;
        },
        test: async ({ fetch }) => {
          const res = await fetch({ method: "GET" });
          expect(res.headers.get("content-type")).toContain("application/json");
          expect(res.status).toBe(200);
        },
      });
    });
  });
});

export {};
