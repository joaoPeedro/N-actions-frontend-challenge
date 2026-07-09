import * as SelectPrimitive from "@radix-ui/react-select";
import { cx } from "class-variance-authority";
import { type ComponentPropsWithoutRef, type ReactNode,useEffect, useId, useRef, useState } from "react";

import styles from "./Select.module.css";

/** Sentinel value for "clear / all" options — Radix rejects empty-string item values. */
export const SELECT_EMPTY_VALUE = "__ds_select_empty__";

function toFormValue(value: string | undefined, emptyValue?: string): string {
  if (value === undefined || value === emptyValue) {
    return "";
  }
  return value;
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  children: ReactNode;
  className?: string;
};

export function SelectItem({ children, className, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item className={cx(styles.item, className)} {...props}>
      <span className={styles.itemIndicator}>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText className={styles.itemText}>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export type SelectProps = {
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  /** When the select value equals this sentinel, the hidden form input submits an empty string. */
  emptyValue?: string;
  children: ReactNode;
  className?: string;
};

export function Select({
  label,
  name,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled = false,
  id: idProp,
  emptyValue = SELECT_EMPTY_VALUE,
  children,
  className,
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const [formValue, setFormValue] = useState<string | undefined>(
    () => value ?? defaultValue,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isControlled) {
      setFormValue(value);
    }
  }, [isControlled, value]);

  const handleValueChange = (nextValue: string) => {
    setFormValue(nextValue);

    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = toFormValue(nextValue, emptyValue);
    }

    onValueChange?.(nextValue);
  };

  const rootProps = isControlled
    ? { value, onValueChange: handleValueChange }
    : { defaultValue, onValueChange: handleValueChange };

  return (
    <div className={cx(styles.root, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      {name && (
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          value={toFormValue(formValue, emptyValue)}
        />
      )}

      <SelectPrimitive.Root disabled={disabled} open={open} onOpenChange={setOpen} {...rootProps}>
        <SelectPrimitive.Trigger
          id={id}
          className={cx(
            styles.trigger,
            open && styles.triggerOpen,
            disabled && styles.triggerDisabled,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} className={styles.value} />
          <SelectPrimitive.Icon className={cx(styles.icon, open && styles.iconOpen)}>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={styles.content} position="popper" sideOffset={4}>
            <SelectPrimitive.Viewport className={styles.viewport}>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}

Select.Item = SelectItem;
