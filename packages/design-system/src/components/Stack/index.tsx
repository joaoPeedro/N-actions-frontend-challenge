import { cx } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./Stack.module.css";

const gapClass = {
  none: styles.gapNone,
  small: styles.gapSmall,
  medium: styles.gapMedium,
  large: styles.gapLarge,
} as const;

const alignClass = {
  stretch: styles.alignStretch,
  center: styles.alignCenter,
  start: styles.alignStart,
  end: styles.alignEnd,
  baseline: styles.alignBaseline,
} as const;

const justifyClass = {
  start: styles.justifyStart,
  end: styles.justifyEnd,
  center: styles.justifyCenter,
  "space-between": styles.justifySpaceBetween,
} as const;

export interface StackProps extends Omit<ComponentPropsWithoutRef<"div">, "children" | "style"> {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  gap?: "none" | "small" | "medium" | "large";
  align?: "stretch" | "center" | "start" | "end" | "baseline";
  justify?: "start" | "end" | "center" | "space-between";
  wrap?: boolean;
  fullWidth?: boolean;
}

export function Stack({
  children,
  direction = "vertical",
  gap = "medium",
  align,
  justify,
  wrap,
  fullWidth = false,
  className,
  ...props
}: StackProps) {
  const isHorizontal = direction === "horizontal";
  const resolvedAlign = align ?? (isHorizontal ? "center" : "stretch");

  return (
    <div
      className={cx(
        styles.stack,
        isHorizontal ? styles.horizontal : styles.vertical,
        gapClass[gap],
        alignClass[resolvedAlign],
        isHorizontal && justifyClass[justify ?? "start"],
        isHorizontal && ((wrap ?? true) ? styles.wrap : styles.nowrap),
        fullWidth && styles.fullWidth,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
