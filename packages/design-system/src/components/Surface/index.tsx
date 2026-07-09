import { cx } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./Surface.module.css";

const variantClass = {
  default: styles.default,
  card: styles.card,
  subtle: styles.subtle,
} as const;

const paddingClass = {
  none: styles.paddingNone,
  small: styles.paddingSmall,
  medium: styles.paddingMedium,
  large: styles.paddingLarge,
} as const;

const radiusClass = {
  none: styles.radiusNone,
  small: styles.radiusSmall,
  medium: styles.radiusMedium,
  large: styles.radiusLarge,
} as const;

const maxWidthClass = {
  medium: styles.maxWidthMedium,
} as const;

export interface SurfaceProps extends Omit<ComponentPropsWithoutRef<"div">, "children" | "style"> {
  children: ReactNode;
  variant?: "default" | "card" | "subtle";
  padding?: "none" | "small" | "medium" | "large";
  radius?: "none" | "small" | "medium" | "large";
  fullWidth?: boolean;
  maxWidth?: "medium";
}

export function Surface({
  children,
  variant = "default",
  padding = "none",
  radius = "none",
  fullWidth = false,
  maxWidth,
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cx(
        styles.surface,
        variantClass[variant],
        paddingClass[padding],
        radiusClass[radius],
        fullWidth && styles.fullWidth,
        maxWidth && maxWidthClass[maxWidth],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
