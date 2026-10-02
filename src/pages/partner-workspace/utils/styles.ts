import { COLUMN_HEAD, COLUMN_TOOLS, WORKSPACE_GRID } from "../../../utils/styles";

export const GRID = `${WORKSPACE_GRID} partner gap-14 bg-page p-14 text-[13px] grid-cols-[270px_620px_minmax(0,1fr)] max-lg:p-8 lg:max-2xl:grid-cols-[240px_minmax(300px,1.15fr)_minmax(300px,1fr)]`;

export const COLUMN_FRAME =
  "overflow-hidden rounded-[16px] border border-line bg-surface shadow-card";

export const HEAD = `${COLUMN_HEAD} min-h-58 border-b border-line px-16 py-12`;

export const EYEBROW = "flex items-center gap-8 text-[16px] font-bold text-ink";

export const TOOLS = `${COLUMN_TOOLS} px-14 pt-14 pb-0`;


export const SELECT = "text-[13px]";

export const REQUEST_TAB =
  "concave-tab-v relative mb-10 rounded-[14px] border border-line bg-surface p-12 text-ink transition-colors hover:border-line-strong";

export const REQUEST_TAB_ACTIVE =
  "active border-accent bg-accent-tint hover:border-accent";

export const PRIMARY = "font-semibold";

export const HEADING_BUTTON =
  "size-32 min-h-0 min-w-0 rounded-[8px] p-0";
