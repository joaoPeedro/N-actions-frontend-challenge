import { cx } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import styles from "./Text.module.css";

export type TextSupportedTags =
  | "span"
  | "p"
  | "strong"
  | "em"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "li"
  | "b"
  | "i";

const variantClass = {
  body: styles.body,
  "body-semibold": styles.bodySemibold,
  "body-bold": styles.bodyBold,
  heading: styles.heading,
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  subtle: styles.subtle,
  caption: styles.caption,
  overline: styles.overline,
  price: styles.price,
  "display-price": styles.displayPrice,
} as const;

const colorClass = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  subtle: styles.colorSubtle,
  "on-primary": styles.colorOnPrimary,
  danger: styles.colorDanger,
  action: styles.colorAction,
  success: styles.colorSuccess,
} as const;

export type TextVariant = keyof typeof variantClass;
export type TextColor = keyof typeof colorClass;

export type TextProps<C extends TextSupportedTags> = {
  as?: C;
  children: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  transform?: "capitalize";
  inheritColor?: boolean;
} & Omit<ComponentPropsWithoutRef<C>, "as" | "children" | "color" | "style">;

export function Text<C extends TextSupportedTags = "span">({
  as,
  children,
  variant = "body",
  color = "primary",
  transform,
  inheritColor = false,
  className,
  ...props
}: TextProps<C>) {
  const Component = (as || "span") as ElementType;

  return (
    <Component
      className={cx(
        styles.text,
        variantClass[variant],
        !inheritColor && colorClass[color],
        inheritColor && styles.inheritColor,
        transform === "capitalize" && styles.capitalize,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
