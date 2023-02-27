import * as services from "@services/platform/github";
import * as templates from "@components/github";

import handlePlatformAPI from "@services/api/handler";
export default handlePlatformAPI(services, templates);
