import { brandALightTheme } from "@dt/design-tokens";

import { toCSSVariables } from "./toCSSVariables";

describe("toCSSVariables", () => {
  it("generates CSS custom properties from a theme", () => {
    const result = toCSSVariables(brandALightTheme);

    expect(result).toMatch(/--ds-/);
    expect(result).toContain(":root {");
    expect(result).toContain("--ds-color-text-primary");
  });

  it("generates variables across token categories", () => {
    const result = toCSSVariables(brandALightTheme);

    expect(result.match(/--ds-/g)?.length).toBeGreaterThan(30);
    expect(result).toContain("--ds-space-layout-gutter");
    expect(result).toContain("--ds-radius-md");
    expect(result).toContain("--ds-font-family-body");
  });

  it("returns identical output for the same theme on repeated calls", () => {
    const first = toCSSVariables(brandALightTheme);
    const second = toCSSVariables(brandALightTheme);

    expect(first).toBe(second);
  });
});
