export const AUTH_HERO_IMAGE = "/assets/auth/auth-hero.jpg";

export const AUTH_HERO_TAGLINE = {
  title: "Сделки под контролем",
  text: "Запросы клиентов, предложения партнёров и статус каждой сделки — в одном кабинете.",
};

/** Frosted-glass tile on top of the hero photo; always light so it reads on the image in both themes. */
export const HERO_GLASS =
  "bg-white/45 text-[#0f172a] shadow-[0_16px_40px_rgb(15_23_42/0.16)] backdrop-blur-2xl backdrop-saturate-[1.8]";

export const HERO_CARD = `absolute rounded-[14px] px-14 py-12 ${HERO_GLASS}`;

export const HERO_ICON_CHIP =
  "grid shrink-0 place-items-center rounded-[8px] bg-[#f97316] text-white shadow-[0_6px_14px_rgb(249_115_22/0.35)]";

export const AUTH_THEME_TOGGLE =
  "size-40 rounded-full bg-white/60 text-ink shadow-[0_8px_24px_-8px_rgb(15_23_42/0.25)] backdrop-blur-xl backdrop-saturate-150 hover:not-disabled:bg-white/80 hover:not-disabled:text-accent dark:bg-white/10 dark:hover:not-disabled:bg-white/20";

export const AUTH_PAGE_BACKGROUND =
  "bg-surface bg-[radial-gradient(55%_45%_at_100%_0%,rgb(249_115_22/0.16)_0%,transparent_70%),radial-gradient(45%_40%_at_55%_100%,rgb(251_191_36/0.12)_0%,transparent_70%)]";

export const AUTH_FORM_CARD =
  "rounded-[16px] border border-line bg-surface/80 p-28 shadow-[0_24px_60px_-28px_rgb(124_45_18/0.35)] backdrop-blur-xl max-xs:border-0 max-xs:bg-transparent max-xs:p-0 max-xs:shadow-none";

export const AUTH_SUBMIT_BUTTON =
  "w-full border-0 bg-[linear-gradient(135deg,#fb923c_0%,#f97316_45%,#ea580c_100%)] py-11 shadow-[0_10px_24px_-8px_rgb(249_115_22/0.65)] transition-[filter,box-shadow] hover:not-disabled:bg-[linear-gradient(135deg,#fb923c_0%,#f97316_45%,#ea580c_100%)] hover:not-disabled:brightness-105 hover:not-disabled:shadow-[0_14px_28px_-8px_rgb(249_115_22/0.75)]";
