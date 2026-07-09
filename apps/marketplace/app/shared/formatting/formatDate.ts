import { DEFAULT_LOCALE } from "./constants";
import { toDate } from "./toDate";

interface FormatDateOptions {
  locale?: string;
}

export function formatDate(
  value: string | Date,
  { locale = DEFAULT_LOCALE }: FormatDateOptions = {}
): string {
  const date = toDate(value);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
