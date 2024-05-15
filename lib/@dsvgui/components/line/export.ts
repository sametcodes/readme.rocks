import { getGridComponents } from "../../utils";
import {
  Compact,
  Colored,
  WithSecondaryTitle,
  WithPeriodLabels,
  MultipleLines,
} from "./index.stories";
import { Line } from "./index";

export default getGridComponents(
  [Compact, Colored, WithSecondaryTitle, WithPeriodLabels, MultipleLines],
  Line
);
