import * as services from "@services/platform/stackoverflow";
import * as templates from "@components/svgs/stackoverflow";

import handlePlatformAPI from "@services/api/handler";
export default handlePlatformAPI("stackoverflow", services, templates);
