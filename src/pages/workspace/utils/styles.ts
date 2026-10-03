import {
  COLUMN_HEAD,
  COLUMN_TOOLS,
  SCROLL,
  WORKSPACE_GRID,
} from "../../../utils/styles";

export const GRID = `${WORKSPACE_GRID} grid-cols-[300px_330px_minmax(0,1fr)] max-2xl:grid-cols-[270px_300px_minmax(0,1fr)] lg:max-xl:grid-cols-[250px_270px_minmax(0,1fr)]`;

export const CLIENTS_COLUMN = "border-r border-line bg-surface pt-20";
export const REQUESTS_COLUMN = "border-r border-line bg-subtle pt-20";
export const OFFERS_COLUMN = "bg-page";

export const HEAD = `${COLUMN_HEAD} px-16 pb-14`;
export const TOOLS = `${COLUMN_TOOLS} relative px-16 pb-14`;

export const COLUMN_TITLE = "flex items-center gap-8 text-[17px] font-bold";

export const COUNT_TONE = "bg-fill px-8 py-2 text-[11px] font-semibold text-muted";

export const COUNT_BUTTON =
  "cursor-pointer border-0 hover:not-disabled:bg-fill-hover hover:not-disabled:text-ink";


export const NEW_ITEM_BUTTON = "h-34 whitespace-nowrap rounded-[10px] px-12 py-6 text-[12px]";

export const CLIENT_FILTER =
  "absolute top-4 right-20 size-30 min-h-0 min-w-0 gap-0 p-6 text-[0px]";

export const CLIENT_TABS = `${SCROLL} client-tabs flex flex-col gap-6 px-10 pb-16`;

export const REQUEST_TABS = `${SCROLL} flex flex-col gap-10 px-14 pb-16`;

export const CLIENT_TAB =
  "concave-tab-v rounded-[14px] border border-transparent p-10 text-ink transition-colors hover:bg-subtle";

export const CLIENT_TAB_ACTIVE =
  "active border-accent-edge bg-accent-tint hover:bg-accent-tint";

export const REQUEST_TAB =
  "rounded-[14px] border border-line bg-surface p-14 text-ink shadow-card transition-colors hover:border-line-strong";

export const REQUEST_TAB_ACTIVE =
  "border-accent bg-surface shadow-[0_0_0_3px_var(--c-accent-tint)] hover:border-accent";

export const MINI_REQUEST =
  "client-request-mini relative flex w-full items-center justify-start gap-10 rounded-[10px] border border-line bg-surface px-10 py-8 text-left text-ink-soft hover:not-disabled:border-line-strong hover:not-disabled:bg-surface";

export const MINI_REQUEST_ACTIVE =
  "border-accent text-ink hover:not-disabled:border-accent";

export const REQUEST_LINK =
  "min-w-0 justify-center gap-5 whitespace-nowrap rounded-[8px] px-6 py-6 text-[11px] font-medium";

export const REQUEST_LINK_LAST =
  "bg-accent-tint text-accent-text hover:not-disabled:bg-accent-tint hover:not-disabled:text-accent-hover";

export const REQUEST_BOX =
  "mt-10 rounded-[10px] bg-subtle p-10 text-[12px] [&>small]:mb-6 [&>small]:block [&>small]:text-[10px] [&>small]:font-semibold [&>small]:uppercase [&>small]:tracking-[0.6px] [&>small]:text-faint";

export const OFFERS_HEAD =
  "flex flex-col gap-14 border-b border-line bg-surface px-24 pt-18 pb-14 max-lg:px-16";

export const OFFER_TABS = {
  root: "gap-6",
  tab: "",
  count: "ml-2 bg-transparent px-0 py-0 text-[11px] text-inherit opacity-75",
};

export const CAROUSEL = `${SCROLL} grid auto-rows-max content-start grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-20 p-24 max-lg:gap-14 max-lg:p-14`;

export const ACTION_BAR =
  "flex shrink-0 items-center justify-between gap-12 border-t border-line bg-surface px-24 py-12 max-lg:px-16 max-xs:gap-8";
