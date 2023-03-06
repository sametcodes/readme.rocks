import * as services from "@/services/platform/wakatime";
import * as templates from "@/components/svgs/wakatime";

import handlePlatformAPI from "@/services/api/handler";
export default handlePlatformAPI("wakatime", services, templates);
