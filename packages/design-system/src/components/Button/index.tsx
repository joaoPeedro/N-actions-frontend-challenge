import { cx } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
};

export type ButtonProps =
  | (ButtonBaseProps & { iconOnly?: false; children: ReactNode })
  | (ButtonBaseProps & { iconOnly: true; children: ReactNode; "aria-label": string });

export function Button({
  variant = "primary",
  icon,
  iconOnly = false,
  loading = false,
  disabled,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      {...(loading ? { "aria-busy": "true" } : {})}
      className={cx(
        styles.button,
        styles[variant],
        icon && !iconOnly && styles.withIcon,
        iconOnly && styles.iconOnly,
        loading && styles.loading,
        isDisabled && styles.buttonDisabled,
        className,
      )}
      {...props}
    >
      {loading && (
        <span className={styles.spinner} role="status" aria-hidden="true" />
      )}
      {loading ? (
        <span className={styles.content}>
          {icon && !iconOnly && icon}
          {children}
        </span>
      ) : (
        <>
          {icon && !iconOnly && icon}
          {children}
        </>
      )}
    </button>
  );
}
