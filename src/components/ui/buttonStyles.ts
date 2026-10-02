export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "contrast"
  | "ghost"
  | "link"
  | "tab";

export const BUTTON_VARIANTS: ButtonVariant[] = [
  "default",
  "primary",
  "secondary",
  "contrast",
  "ghost",
  "link",
  "tab",
];

export const BUTTON_BASE =
  "cursor-pointer text-inherit inline-flex items-center gap-7 leading-[1.35] font-medium transition-colors disabled:opacity-45 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

const BOXED = "justify-center border rounded-[10px] px-14 py-8";

export const BUTTON_SHAPES: Record<ButtonVariant, string> = {
  default: BOXED,
  primary: BOXED,
  secondary: BOXED,
  contrast: BOXED,
  ghost: BOXED,
  tab: "justify-center border rounded-full px-14 py-6 text-[12px] max-xs:px-10 max-xs:text-[11px]",
  link: "justify-start text-left p-0 border-0",
};

export const BUTTON_COLORS: Record<ButtonVariant, string> = {
  default:
    "bg-fill border-transparent text-ink-soft hover:not-disabled:bg-fill-hover",
  primary:
    "bg-accent border-accent text-white font-semibold shadow-[0_1px_2px_#f9731640] hover:not-disabled:bg-accent-hover hover:not-disabled:border-accent-hover",
  secondary:
    "bg-accent-tint border-accent-edge text-accent-text hover:not-disabled:border-accent",
  contrast:
    "bg-contrast border-contrast text-on-contrast font-semibold hover:not-disabled:opacity-90",
  ghost:
    "bg-transparent border-transparent text-muted hover:not-disabled:bg-fill hover:not-disabled:text-ink",
  tab: "bg-surface border-line text-muted hover:not-disabled:border-line-strong hover:not-disabled:text-ink",
  link: "text-accent-text bg-transparent hover:not-disabled:text-accent-hover",
};

export const BUTTON_SELECTED =
  "bg-accent-tint border-accent text-accent-text font-semibold hover:not-disabled:bg-accent-tint hover:not-disabled:border-accent";

export const TAB_ACTIVE =
  "bg-accent border-accent text-white font-semibold hover:not-disabled:border-accent hover:not-disabled:text-white";

export const ICON_ONLY = "p-8 min-w-36 min-h-36";

export const VARIANT_MARKERS: Partial<Record<ButtonVariant, string>> = {
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  link: "link-button",
};
