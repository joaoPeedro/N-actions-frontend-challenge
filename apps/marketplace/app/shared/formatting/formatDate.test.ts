import { formatDate } from "./formatDate";

const ISO_DATE = "2024-03-15T14:30:00.000Z";

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate(ISO_DATE, { locale: "en-GB" })).toBe("15 Mar 2024");
  });

  it("formats a Date instance", () => {
    const fromString = formatDate(ISO_DATE, { locale: "en-GB" });
    const fromDate = formatDate(new Date(ISO_DATE), { locale: "en-GB" });

    expect(fromDate).toBe("15 Mar 2024");
    expect(fromDate).toBe(fromString);
  });

  it("throws for invalid date input", () => {
    expect(() => formatDate("invalid", { locale: "en-GB" })).toThrow(RangeError);
  });
});
