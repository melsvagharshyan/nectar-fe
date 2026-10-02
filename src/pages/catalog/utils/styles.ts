import type { TabsClassNames } from "../../../components/ui";

/** Overrides the shared PAGE padding at every breakpoint. */
export const CATALOG_PAGE = "catalog-page max-w-[1600px] p-24 max-md:p-16";

export const CATALOG_HEAD =
  "mb-20 flex items-end justify-between gap-16 max-md:flex-wrap max-md:items-start";

export const CATALOG_TITLE = "text-[24px] tracking-[-0.5px] max-md:text-[20px]";

export const CATALOG_SUMMARY = "mt-4 text-[13px] text-muted [&_b]:font-semibold [&_b]:text-ink";

export const CATALOG_LAYOUT =
  "grid items-start gap-24 lg:grid-cols-[280px_minmax(0,1fr)] max-lg:gap-16";

export const CATALOG_MAIN = "flex min-w-0 flex-col gap-16";

export const STATUS_TABS: TabsClassNames = {
  root: "gap-6 max-md:flex-nowrap max-md:overflow-auto",
  tab: "max-md:shrink-0",
  count: "ml-2 bg-transparent px-0 py-0 text-[11px] text-inherit opacity-75",
};

export const CATALOG_TOOLBAR =
  "m-0 gap-10 rounded-[16px] border border-line bg-surface p-10 shadow-card [&_.search]:w-380 [&_.search]:max-w-full max-md:[&_.search]:w-full";

export const TOOLBAR_SPACER = "flex-1 max-md:hidden";

export const VIEW_TOGGLE = "flex gap-2 rounded-[10px] bg-fill p-3";

export const VIEW_BUTTON =
  "min-h-32 min-w-32 rounded-[8px] p-6 text-muted hover:not-disabled:bg-transparent hover:not-disabled:text-ink";

export const VIEW_BUTTON_ACTIVE =
  "bg-surface text-ink shadow-card hover:not-disabled:bg-surface";

export const FILTER_TOGGLE = "lg:hidden";

export const FILTER_PANEL =
  "flex flex-col gap-18 rounded-[16px] border border-line bg-surface p-20 shadow-card lg:sticky lg:top-24";

export const FILTER_HEAD = "flex items-center justify-between";

export const FILTER_GROUP =
  "flex flex-col gap-8 text-[12px] font-semibold text-ink-soft [&_.ant-select]:w-full";

export const ROOM_CHIPS =
  "flex w-full [&>.ant-radio-button-wrapper]:flex-1 [&>.ant-radio-button-wrapper]:px-0 [&>.ant-radio-button-wrapper]:text-center";

export const CATALOG_GRID =
  "grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-20 max-md:gap-14";

export const CATALOG_PRICE = "text-[15px] font-bold";

export const CATALOG_ID = "whitespace-nowrap font-code text-[12px] text-faint";

export const CATALOG_THUMB = "h-60 w-88 rounded-[10px] object-cover";

export const TABLE_ACTIONS = "flex gap-6 max-[1025px]:flex-wrap";

export const TABLE_ACTION_BUTTON = "rounded-[8px] px-10 py-6 text-[12px] max-lg:text-[11px]";
