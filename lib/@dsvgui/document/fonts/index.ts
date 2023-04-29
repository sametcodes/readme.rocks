// run build:fonts script to generate fonts

import * as Manrope from "./manrope";
import * as OpenSans from "./opensans";

const fonts = { Manrope, OpenSans };

export type FontFamily = keyof typeof fonts;
export const defaultFont: FontFamily = "Manrope";

export default fonts;
