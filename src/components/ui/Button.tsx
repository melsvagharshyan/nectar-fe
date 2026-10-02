import type { ButtonHTMLAttributes, Ref } from "react";
import { cn } from "../../utils/helpers";
import {
  BUTTON_BASE,
  BUTTON_COLORS,
  BUTTON_SELECTED,
  BUTTON_SHAPES,
  ICON_ONLY,
  TAB_ACTIVE,
  VARIANT_MARKERS,
  type ButtonVariant,
} from "./buttonStyles";

export type { ButtonVariant };

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  iconOnly?: boolean;
  selected?: boolean;
  active?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = "default",
  iconOnly = false,
  selected = false,
  active = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    BUTTON_BASE,
    BUTTON_SHAPES[variant],
    BUTTON_COLORS[variant],
    iconOnly && ICON_ONLY,
    iconOnly && variant === "default" && "bg-transparent text-muted hover:not-disabled:text-ink",
    selected && BUTTON_SELECTED,
    active && variant === "tab" && TAB_ACTIVE,
    VARIANT_MARKERS[variant],
    iconOnly && "icon-btn",
    selected && "selected",
    active && "active",
    className,
  );
  return <button type={type} className={classes} {...props} />;
}
