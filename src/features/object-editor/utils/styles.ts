/*
  The editor renders either embedded in a page (/partner/objects/new) or inside
  the overlay drawer. The embedded layout is a flush two-pane screen; the overlay
  keeps the card-like form. Where both differ, the classes come in pairs.
*/

/** Applied to the wrapping page; only kicks in once the editor layout is rendered. */
export const EDITOR_PAGE =
  "has-[.editor-layout]:max-w-none has-[.editor-layout]:bg-page has-[.editor-layout]:p-0";

export const EMBEDDED_HEAD =
  "m-0 flex min-h-70 items-center justify-between gap-16 border-b border-line bg-surface px-24 py-16 max-lg:items-start";

export const EMBEDDED_TITLE = "text-[20px] tracking-[-0.4px]";

export const EMBEDDED_NOTICE = "mx-24 my-8 px-12 py-7 text-[11px] leading-[1.65]";

export const EDITOR_TABS = "hidden max-md:flex";

export const EMBEDDED_TABS = "max-md:mx-16 max-md:my-12";

const LAYOUT_BASE = "editor-layout grid max-md:block";

export const LAYOUT = {
  overlay: `${LAYOUT_BASE} mt-22 grid-cols-[minmax(230px,.8fr)_minmax(0,1.2fr)] gap-24`,
  embedded: `${LAYOUT_BASE} mt-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-0`,
};

const PREVIEW_BASE =
  "editor-preview sticky top-20 w-full min-w-0 self-start justify-self-center";

export const PREVIEW = {
  overlay: `${PREVIEW_BASE} max-w-500 max-lg:static max-md:max-w-none`,
  embedded: `${PREVIEW_BASE} flex min-h-[calc(100dvh-190px)] max-w-none flex-col items-center justify-center gap-20 p-32 max-[1025px]:p-20 max-md:static max-md:min-h-0 max-md:p-16`,
};

const FORM_BASE = "flex min-w-0 flex-col gap-20";

/** Embedded boxes and disclosures are restyled from the form, like the original screen rules. */
export const FORM = {
  overlay: `${FORM_BASE} rounded-[16px] border border-line bg-surface p-24 max-md:p-16`,
  embedded: [
    FORM_BASE,
    "rounded-none border-0 border-l border-line bg-surface p-32 max-[1025px]:p-20 max-md:border-l-0 max-md:p-16",
    "[&_:is(.box,details)]:rounded-[16px] [&_:is(.box,details)]:border [&_:is(.box,details)]:border-line [&_:is(.box,details)]:bg-surface [&_:is(.box,details)]:p-24",
  ].join(" "),
};

export const FIELDSET = "m-0 min-w-0 border-0 p-0";

export const ACTIONS = {
  overlay: "py-12",
  embedded: "py-12",
};

export const EMBEDDED_PRIMARY = "px-18";

export const SECTION =
  "mb-20 rounded-[16px] border border-line bg-surface p-24 max-md:p-16 [&>.field+.field]:mt-18 [&>.field+.form-grid]:mt-18";

export const SECTION_TITLE =
  "m-0 mb-18 flex items-center gap-8 p-0 text-[15px] font-bold text-ink before:h-16 before:w-4 before:shrink-0 before:rounded-full before:bg-accent before:content-['']";

export const SECTION_SUMMARY = `${SECTION_TITLE} cursor-pointer [details[open]>&]:mb-10`;

export const PRICE_GRID = "grid-cols-[1fr_1fr_1fr] max-md:grid-cols-[1fr_1fr] max-xs:grid-cols-[1fr_1fr]";

export const CALCULATED = "text-[12px] font-medium text-ink-soft";

export const CALCULATED_VALUE =
  "mt-6 block min-h-40 rounded-[10px] border border-dashed border-line-strong bg-subtle px-12 py-10 text-[13px] font-semibold text-ink";

export const SEGMENTS_LABEL = "mb-6 block text-[12px] font-medium text-ink-soft";

export const SEGMENTS =
  "flex w-full [&>.ant-radio-button-wrapper]:min-w-0 [&>.ant-radio-button-wrapper]:flex-1 [&>.ant-radio-button-wrapper]:px-6 [&>.ant-radio-button-wrapper]:text-center [&>.ant-radio-button-wrapper]:text-[12px] [&>.ant-radio-button-wrapper]:font-semibold";

export const SEGMENTS_WRAP = {
  type: "max-md:flex-wrap max-md:[&>.ant-radio-button-wrapper]:flex-[1_0_30%]",
  rooms: "max-md:flex-wrap max-md:[&>.ant-radio-button-wrapper]:flex-[1_0_20%]",
};
