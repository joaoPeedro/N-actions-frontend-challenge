import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats currency using default options", () => {
    const formatted = formatCurrency(1234.5);

    expect(formatted).toContain("£");
    expect(formatted).toContain("1,234");
  });

  it("accepts custom currency and locale options", () => {
    const formatted = formatCurrency(1234.5, { currency: "EUR", locale: "pt-PT" });

    expect(formatted).not.toContain("£");
    expect(formatted.length).toBeGreaterThan(0);
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toContain("£");
    expect(formatCurrency(0)).toContain("0");
  });

  it("formats negative values", () => {
    const formatted = formatCurrency(-10.5);

    expect(formatted).toMatch(/-|−/);
    expect(formatted).toContain("10");
  });

  it("formats decimal values", () => {
    const formatted = formatCurrency(0.99);

    expect(formatted).toContain("£");
    expect(formatted).toContain("0");
    expect(formatted).toContain("99");
  });
});
