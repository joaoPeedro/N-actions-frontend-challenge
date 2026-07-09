import { DEFAULT_LOCALE } from "./constants";

interface FormatCurrencyOptions {
  currency?: string;
  locale?: string;
}

export function formatCurrency(
  value: number,
  { currency = "GBP", locale = DEFAULT_LOCALE }: FormatCurrencyOptions = {}
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
