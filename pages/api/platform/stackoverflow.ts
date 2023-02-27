import * as services from "@services/platform/stackoverflow";
import * as templates from "@components/stackoverflow";

import handlePlatformAPI from "@services/api/handler";
export default handlePlatformAPI(services, templates);
