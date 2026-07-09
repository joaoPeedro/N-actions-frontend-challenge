import { cx } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./Badge.module.css";

export type BadgeVariant = "danger" | "primary" | "neutral";

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
};

export function Badge({
  variant = "neutral",
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[variant], className)} {...props}>
      {children}
    </span>
  );
}
