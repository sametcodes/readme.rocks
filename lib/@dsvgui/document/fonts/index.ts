// run build:fonts script to generate fonts

import * as Manrope from "./manrope";
import * as OpenSans from "./opensans";
import * as Tahoma from "./tahoma";

const fonts = { Manrope, OpenSans, Tahoma };

export type FontFamily = keyof typeof fonts;
export const defaultFont: FontFamily = "Tahoma";

export default fonts;
