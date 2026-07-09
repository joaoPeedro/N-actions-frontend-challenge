import { cx } from "class-variance-authority";
import type { ReactNode } from "react";

import { Stack, type StackProps } from "@ds/design-system";

import styles from "./PageTitleSection.module.css";

export interface PageTitleSectionProps extends Omit<StackProps, "children" | "gap" | "direction"> {
  children: ReactNode;
  bordered?: boolean;
}

export function PageTitleSection({
  children,
  bordered = true,
  className,
  ...props
}: PageTitleSectionProps) {
  return (
    <Stack className={cx(bordered && styles.bordered, className)} {...props}>
      <Stack gap="small">{children}</Stack>
    </Stack>
  );
}
