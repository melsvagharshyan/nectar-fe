export const TOAST_DURATION_MS = 4500;
export const ERROR_TOAST_DURATION_MS = 7000;
export const UNDO_TOAST_DURATION_MS = 6000;
export const UNDO_LABEL = "Отменить";

export const TOAST_CLASSNAMES = {
  toast:
    "group relative flex w-full items-center gap-12 overflow-hidden rounded-[14px] border border-line bg-surface/95 py-14 pr-40 pl-16 font-[inherit] text-ink shadow-[0_24px_60px_-24px_rgb(15_23_42/0.45)] backdrop-blur-xl sm:w-[380px]",
  icon: "!m-0 !size-auto shrink-0 self-start",
  content: "min-w-0 flex-1",
  title: "text-[14px] leading-[1.35] font-semibold",
  description: "mt-2 text-[13px] leading-[1.4] text-muted",
  actionButton:
    "shrink-0 cursor-pointer rounded-[8px] border-0 bg-[linear-gradient(135deg,#fb923c_0%,#f97316_45%,#ea580c_100%)] px-12 py-7 text-[12px] font-semibold text-white shadow-[0_6px_14px_-6px_rgb(249_115_22/0.7)] transition-[filter] hover:brightness-105",
  cancelButton:
    "shrink-0 cursor-pointer rounded-[8px] border border-line bg-fill px-12 py-7 text-[12px] font-medium text-ink-soft",
  closeButton:
    "absolute top-10 right-10 grid size-22 cursor-pointer place-items-center rounded-[6px] border-0 bg-transparent text-muted transition-colors hover:bg-fill hover:text-ink [&_svg]:size-12",
};

export const TOAST_ICON_CHIP =
  "grid size-32 place-items-center rounded-[10px] text-white shadow-[0_6px_14px_-6px_rgb(15_23_42/0.4)]";

export const TOAST_ICON_GRADIENTS = {
  success: "bg-[linear-gradient(135deg,#4ade80_0%,#16a34a_100%)]",
  error: "bg-[linear-gradient(135deg,#fb7185_0%,#dc2626_100%)]",
  warning: "bg-[linear-gradient(135deg,#fcd34d_0%,#d97706_100%)]",
  info: "bg-[linear-gradient(135deg,#fdba74_0%,#f97316_55%,#c2410c_100%)]",
};
