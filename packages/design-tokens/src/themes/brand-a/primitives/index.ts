import type { PrimitiveTheme } from "../../../contracts/primitives";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { elevation } from "./elevation";
import { motion } from "./motion";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const primitives: PrimitiveTheme = {
  colors,
  spacing,
  typography,
  radius,
  elevation,
  motion,
  breakpoints,
};
