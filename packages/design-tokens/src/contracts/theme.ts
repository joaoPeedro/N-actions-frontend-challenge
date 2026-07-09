import type { PrimitiveTheme } from "./primitives";
import type { SemanticTheme } from "./semantic";

export interface ResolvedTheme {
  name: string;
  mode: "light" | "dark";
  primitives: PrimitiveTheme;
  semantic: SemanticTheme;
}
