import { DEFAULT_LOCALE } from "./constants";

interface FormatNumberOptions {
  locale?: string;
}

export function formatNumber(
  value: number,
  { locale = DEFAULT_LOCALE }: FormatNumberOptions = {}
): string {
  return new Intl.NumberFormat(locale).format(value);
}
