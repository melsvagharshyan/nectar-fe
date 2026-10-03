// Semantic class names (box, record, ...) stay first: screen-specific CSS still targets them.

export const BOX =
  "box rounded-[16px] border border-line bg-surface p-22 shadow-card [&_h2]:mb-16";

export const RECORD =
  "record flex items-center justify-between gap-15 border-b border-line py-14 last:border-b-0 max-xs:flex-wrap [&_p]:mt-4 [&_p]:text-[13px] [&_p]:text-muted [&>div>small]:mt-5 [&>div>small]:block";

export const NOTICE =
  "notice rounded-[12px] border border-accent-edge bg-accent-tint p-14 text-[12px] leading-[1.65] text-ink-soft";

export const ERROR_BOX =
  "error rounded-[12px] border border-danger bg-danger-tint p-14 text-danger";

export const PAGE =
  "page m-auto max-w-[1600px] px-36 py-30 max-lg:px-16 max-lg:py-22";

export const PAGE_HEAD =
  "page-head mb-24 flex items-center justify-between gap-16 max-lg:items-start max-lg:[&_h1]:text-[20px] [&_p]:mt-6 [&_p]:text-[13px] [&_p]:text-muted";

export const TOOLBAR =
  "toolbar my-18 flex flex-wrap items-center gap-10 [&_.search]:w-330 max-xs:[&_.search]:w-full";

export const TABLE_WRAP =
  "overflow-hidden rounded-[16px] border border-line bg-surface shadow-card [&_td_small]:text-[12px] [&_td_strong]:font-semibold";

export const TABLE_PAGINATION =
  "!m-0 border-t border-line !px-16 !py-12 [&_.ant-pagination-total-text]:mr-auto [&_.ant-pagination-total-text]:text-[12px] [&_.ant-pagination-total-text]:text-muted [&_.ant-pagination-item-active]:!border-accent [&_.ant-pagination-item-active_a]:!text-accent";

export const FIELD =
  "field flex flex-col gap-7 text-[12px] font-medium text-ink-soft [&_.ant-select]:w-full [&_small[role=alert]]:text-danger";

export const CHIPS = "chips flex flex-wrap gap-7 [&_button]:text-[12px]";

export const FORM = "flex flex-col gap-20";

/** "form-grid" stays as a marker for sibling spacing inside editor sections. */
export const FORM_GRID =
  "form-grid grid grid-cols-[1fr_1fr] gap-16 max-xs:grid-cols-[1fr]";

export const FORM_ACTIONS =
  "sticky bottom-0 flex flex-wrap gap-10 border-t border-line bg-surface py-16";

/** "detail-photo" is kept as a hook for the e2e tests. */
export const DETAIL_PHOTO =
  "detail-photo h-320 w-full rounded-[16px] object-cover max-xs:h-230";

export const DETAIL_PRICE = "text-[30px] font-bold tracking-[-0.5px]";

export const DETAILS_GRID =
  "grid grid-cols-[1fr_1fr] gap-18 py-20 [&_div]:flex [&_div]:flex-col [&_div]:gap-6 [&_dt]:text-[11px] [&_dt]:font-semibold [&_dt]:uppercase [&_dt]:tracking-[0.5px] [&_dt]:text-faint [&_dd]:m-0 [&_dd]:font-semibold";

export const DISCLOSURE_SUMMARY =
  "cursor-pointer py-12 font-medium text-ink-soft [details[open]>&]:mb-10";

export const ROW = "flex items-center gap-10";

export const STACK = "flex flex-col gap-14";

export const TWO_COL = "grid grid-cols-2 gap-22 max-lg:grid-cols-1";

export const WORKSPACE_CONTAINER = "flex h-full flex-col";

export const WORKSPACE_GRID = "workspace grid h-full min-h-0 flex-1 max-lg:block";

/** Below 1024px only the column of the current mobile step is shown. */
export const COLUMN = "flex min-h-0 min-w-0 flex-col max-lg:hidden max-lg:h-full";

export const COLUMN_VISIBLE = "max-lg:flex";

export const COLUMN_HEAD = "flex items-center justify-between gap-8";

export const COLUMN_TOOLS = "flex flex-col gap-8 max-lg:w-full max-lg:max-w-600";

export const SCROLL =
  "min-h-0 flex-1 overflow-auto [scrollbar-color:var(--c-line-strong)_transparent] [scrollbar-width:thin]";

export const SELECT_TAB =
  "block w-full justify-start border-0 bg-transparent p-0 text-left hover:not-disabled:bg-transparent";
