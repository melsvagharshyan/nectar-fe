import {
  COLUMN_HEAD,
  COLUMN_TOOLS,
  SCROLL,
  WORKSPACE_GRID,
} from "../../../utils/styles";

export const GRID = `${WORKSPACE_GRID} grid-cols-[380px_minmax(0,1fr)] max-2xl:grid-cols-[350px_minmax(0,1fr)] lg:max-xl:grid-cols-[320px_minmax(0,1fr)] lg:bg-surface`;

export const CLIENTS_COLUMN = "bg-surface pt-20";
/** On desktop the offers sit in an inset rounded panel that the open client tab flows into. */
export const OFFERS_COLUMN = "bg-page lg:my-12 lg:mr-12 lg:h-auto lg:overflow-hidden lg:rounded-[18px]";

export const HEAD = `${COLUMN_HEAD} px-16 pb-14`;
export const TOOLS = `${COLUMN_TOOLS} relative px-16 pb-14`;

export const COLUMN_TITLE = "flex items-center gap-8 text-[17px] font-bold";

export const COUNT_TONE = "bg-fill px-8 py-2 text-[11px] font-semibold text-muted";

export const COUNT_BUTTON =
  "cursor-pointer border-0 hover:not-disabled:bg-fill-hover hover:not-disabled:text-ink";


export const NEW_ITEM_BUTTON = "h-34 whitespace-nowrap rounded-[10px] px-12 py-6 text-[12px]";

export const CLIENT_FILTER =
  "absolute top-4 right-20 size-30 min-h-0 min-w-0 gap-0 p-6 text-[0px]";

/** Top padding leaves room for the open tab's upper curve; the tools above shrink to match. */
export const CLIENT_TABS = `${SCROLL} client-tabs flex flex-col gap-6 px-10 pt-12 pb-16`;

export const CLIENT_TOOLS = "pb-2";

export const CLIENT_TAB =
  "rounded-[14px] p-10 text-ink transition-colors hover:bg-subtle";

/** The open client reads as a browser tab joined to the offers column (see .browser-tab). */
export const CLIENT_TAB_ACTIVE =
  "browser-tab active bg-page hover:bg-page lg:-mr-10 lg:rounded-r-none lg:pr-20";

/** Collapsible body of a client tab: animates grid rows between 0fr and 1fr. */
export const ACCORDION_BODY =
  "grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-200 ease-out";

export const ACCORDION_BODY_OPEN = "grid-rows-[1fr] opacity-100";

/** Body of the selected client: request search, request cards, new request. */
export const CLIENT_REQUESTS = "flex flex-col gap-8 [&>button]:w-full";

export const REQUEST_TAB =
  "rounded-[14px] border border-line bg-surface p-14 text-ink shadow-card transition-colors hover:border-line-strong";

export const REQUEST_TAB_ACTIVE =
  "border-accent bg-surface shadow-[0_0_0_3px_var(--c-accent-tint)] hover:border-accent";

export const REQUEST_LINK =
  "min-w-0 justify-center gap-5 whitespace-nowrap rounded-[8px] px-6 py-6 text-[11px] font-medium";

export const REQUEST_LINK_LAST =
  "bg-accent-tint text-accent-text hover:not-disabled:bg-accent-tint hover:not-disabled:text-accent-hover";

export const REQUEST_BOX =
  "mt-10 rounded-[10px] bg-subtle p-10 text-[12px] [&>small]:mb-6 [&>small]:block [&>small]:text-[10px] [&>small]:font-semibold [&>small]:uppercase [&>small]:tracking-[0.6px] [&>small]:text-faint";

export const OFFERS_HEAD =
  "m-10 mb-0 flex flex-col gap-14 rounded-[14px] border border-line bg-surface px-20 pt-16 pb-14 shadow-card max-lg:px-14";

export const OFFER_TABS = {
  root: "gap-6",
  tab: "",
  count: "ml-2 bg-transparent px-0 py-0 text-[11px] text-inherit opacity-75",
};

export const CAROUSEL = `${SCROLL} grid auto-rows-max content-start grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-20 px-10 py-14 max-lg:gap-14`;

export const ACTION_BAR =
  "m-10 mt-0 flex shrink-0 items-center justify-between gap-12 rounded-[14px] border border-line bg-surface px-20 py-12 shadow-card max-lg:px-14 max-xs:gap-8";
