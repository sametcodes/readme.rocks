import * as services from "@services/platform/codewars";
import * as templates from "@components/svgs/codewars";

import handlePlatformAPI from "@services/api/handler";
export default handlePlatformAPI("codewars", services, templates);
