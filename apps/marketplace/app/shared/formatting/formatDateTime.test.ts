import { formatDateTime } from "./formatDateTime";

const ISO_DATE = "2024-03-15T14:30:00.000Z";

describe("formatDateTime", () => {
  it("formats an ISO date-time string using the en-GB locale", () => {
    expect(formatDateTime(ISO_DATE, { locale: "en-GB" })).toBe("15 Mar 2024, 14:30");
  });

  it("formats an ISO date-time string using the pt-PT locale", () => {
    expect(formatDateTime(ISO_DATE, { locale: "pt-PT" })).toBe("15/03/2024, 14:30");
  });
});
