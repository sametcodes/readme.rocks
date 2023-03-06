import * as services from "@/services/platform/github";
import * as templates from "@/components/svgs/github";

import handlePlatformAPI from "@/services/api/handler";
export default handlePlatformAPI("github", services, templates);
