import { DEFAULT_LOCALE } from "./constants";
import { toDate } from "./toDate";

interface FormatDateTimeOptions {
  locale?: string;
}

export function formatDateTime(
  value: string | Date,
  { locale = DEFAULT_LOCALE }: FormatDateTimeOptions = {}
): string {
  const date = toDate(value);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
