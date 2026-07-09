import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  it("formats numbers using the en-GB locale", () => {
    expect(formatNumber(1234567, { locale: "en-GB" })).toBe("1,234,567");
  });

  it("formats numbers using the pt-PT locale", () => {
    expect(formatNumber(1234567, { locale: "pt-PT" })).toBe("1\u00a0234\u00a0567");
  });

  it("formats zero", () => {
    expect(formatNumber(0, { locale: "en-GB" })).toBe("0");
  });

  it("formats decimal numbers", () => {
    const formatted = formatNumber(3.14, { locale: "en-GB" });

    expect(formatted).toContain("3");
    expect(formatted).toContain("14");
  });

  it("formats negative numbers", () => {
    const formatted = formatNumber(-42, { locale: "en-GB" });

    expect(formatted).toMatch(/-|−/);
    expect(formatted).toContain("42");
  });
});
