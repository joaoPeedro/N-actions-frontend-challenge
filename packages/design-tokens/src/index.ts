import { brandALightTheme } from "./themes/brand-a/index";

export const themes = {
  brandA: brandALightTheme,
} as const;

export { brandALightTheme };
export type { PrimitiveTheme } from "./contracts/primitives";
export type { SemanticTheme } from "./contracts/semantic";
export type { ResolvedTheme } from "./contracts/theme";
export type { ResolvedTheme as BrandTheme } from "./contracts/theme";
