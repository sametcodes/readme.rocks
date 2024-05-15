import {
  Size1x1,
  Size2x1,
  Size1x2,
  Size2x2,
  Size3x2,
  Size2x3,
  Size3x3,
} from "./index.stories";

import { getGridComponents } from "../../utils";
import { Placeholder } from "./index";

export default getGridComponents(
  [Size1x1, Size2x1, Size1x2, Size2x2, Size3x2, Size2x3, Size3x3],
  Placeholder
);
