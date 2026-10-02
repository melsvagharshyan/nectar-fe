import { cn } from "../../utils/helpers";
import type { PropertyCardContext, PropertyCardVariant } from "./types";

export interface CardStyles {
  article: string;
  media: string;
  top: string;
  tag: string;
  body: string;
  location: string;
  publicId: string;
  priceRow: string;
  price: string;
  pricePerArea: string;
  title: string;
  specs: string;
  spec: string;
  specLabel: string;
  specValue: string;
  description: string;
  actions: string;
}

const ARTICLE =
  "property group/card flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-line bg-surface text-ink shadow-card transition-shadow hover:shadow-raised";

const TAG =
  "inline-flex items-center gap-6 whitespace-nowrap rounded-full bg-[#ffffffeb] px-10 py-5 text-[11px] font-semibold text-[#0f172a] shadow-[0_1px_2px_#0f172a1f] backdrop-blur-[8px]";

const SPECS_ROW =
  "property-specs grid grid-cols-3 divide-x divide-line rounded-[12px] bg-subtle py-10";

const SPEC_ROW_ITEM = "flex min-w-0 flex-col items-center gap-3 px-6 text-center";

const SPEC_LABEL =
  "block truncate text-[10px] font-semibold uppercase tracking-[0.5px] text-faint";

const ACTIONS =
  "property-actions mt-auto flex flex-wrap gap-8 pt-14 [&>button]:flex-1 [&>button]:whitespace-nowrap [&>button]:px-10 [&>button]:py-9 [&>button]:text-[12px] [&>button_.icon]:size-15";

const COMPACT: CardStyles = {
  article: ARTICLE,
  media: "relative h-200 shrink-0 overflow-hidden bg-fill",
  top: "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-6 p-12",
  tag: TAG,
  body: "flex flex-1 flex-col gap-6 p-16",
  location: "flex min-w-0 items-center gap-5 text-[12px] text-muted [&_.icon]:size-14",
  publicId:
    "ml-auto shrink-0 rounded-[6px] bg-fill px-6 py-2 font-code text-[11px] text-faint",
  priceRow: "flex items-baseline justify-between gap-8",
  price: "whitespace-nowrap text-[19px] font-bold tracking-[-0.4px] tabular-nums",
  pricePerArea: "whitespace-nowrap text-[12px] text-muted",
  title: "truncate text-[14px] font-semibold",
  specs: cn(SPECS_ROW, "mt-6"),
  spec: SPEC_ROW_ITEM,
  specLabel: SPEC_LABEL,
  specValue: "truncate text-[13px] font-semibold",
  description: "hidden",
  actions: ACTIONS,
};

const EDITOR: CardStyles = {
  ...COMPACT,
  media: "relative h-220 shrink-0 overflow-hidden bg-fill",
  description:
    "mt-6 line-clamp-2 border-l-2 border-accent-edge pl-10 text-[12px] leading-[1.55] text-muted [&_u]:no-underline [&_u]:font-semibold [&_u]:text-ink-soft",
};

const PARTNER: CardStyles = {
  ...COMPACT,
  media: "relative h-170 shrink-0 overflow-hidden bg-fill",
  body: "flex flex-1 flex-col gap-5 p-14",
  price: "whitespace-nowrap text-[17px] font-bold tracking-[-0.3px] tabular-nums",
};

const IMMERSIVE: CardStyles = {
  ...COMPACT,
  media: "relative h-210 shrink-0 overflow-hidden bg-fill short:h-180",
  body: "flex flex-1 flex-col gap-6 p-18 max-lg:p-14",
  price: "whitespace-nowrap text-[22px] font-bold tracking-[-0.5px] tabular-nums",
  pricePerArea:
    "whitespace-nowrap rounded-[8px] bg-accent-tint px-8 py-3 text-[12px] font-semibold text-accent-text",
  title: "text-[15px] font-semibold",
  specs:
    "property-specs mt-8 grid grid-cols-3 gap-x-12 gap-y-10 rounded-[12px] bg-subtle p-12 max-xs:grid-cols-2",
  spec: "flex min-w-0 flex-col gap-2",
  specValue: "truncate text-[13px] font-semibold",
  description:
    "mt-8 line-clamp-2 text-[13px] leading-[1.5] text-muted short:hidden [&_u]:no-underline [&_u]:font-semibold [&_u]:text-ink-soft",
  actions: cn(
    ACTIONS,
    "[&>button:first-child]:order-last [&>button:first-child]:basis-full",
  ),
};

/** Status badge drawn over the photo. */
export const TOP_BADGE = "shadow-[0_1px_2px_#0f172a1f] backdrop-blur-[8px] dark:bg-[#0f172acc]";

export const SCORE_TAG = "bg-accent text-white";

export const TAG_KIND_CLASSES = {
  plain: "",
  date: "font-code",
  extra: "",
};

export const FIRST_TAG = "bg-[#0f172ae6] text-white";

const merged = (styles: CardStyles): CardStyles =>
  Object.fromEntries(
    Object.entries(styles).map(([slot, classes]) => [slot, cn(classes)]),
  ) as unknown as CardStyles;

const STYLES = {
  immersive: merged(IMMERSIVE),
  partner: merged(PARTNER),
  editor: merged(EDITOR),
  compact: merged(COMPACT),
};

export const cardStyles = (
  variant: PropertyCardVariant,
  context: PropertyCardContext,
): CardStyles => {
  if (variant === "immersive") return STYLES.immersive;
  if (context === "partner") return STYLES.partner;
  if (context === "editor") return STYLES.editor;
  return STYLES.compact;
};
