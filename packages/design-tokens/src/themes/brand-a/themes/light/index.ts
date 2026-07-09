import type { ResolvedTheme } from "../../../../contracts/theme";
import { primitives } from "../../primitives";
import { semantic } from "./semantic";

export const brandALightTheme: ResolvedTheme = {
  name: "brand-a",
  mode: "light",
  primitives,
  semantic,
};
export { semantic };
