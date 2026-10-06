export const ADMIN_HERO_TAGLINE = {
  title: "Панель администратора",
  text: "Проверка заявок, запросов и предложений, финальное подтверждение сделок — всё, что проходит через модерацию Nectar.",
};

/** Dark slate panel instead of the cabinet's photo, so the admin entrance reads differently. */
export const ADMIN_HERO =
  "relative overflow-hidden rounded-[20px] bg-[#0f172a] bg-[radial-gradient(60%_50%_at_0%_0%,rgb(249_115_22/0.28)_0%,transparent_70%),radial-gradient(50%_45%_at_100%_100%,rgb(56_189_248/0.14)_0%,transparent_70%)] text-white shadow-[0_30px_70px_-30px_rgb(15_23_42/0.6)] max-lg:hidden";

/** Fine grid behind the cards. */
export const ADMIN_HERO_GRID =
  "absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]";

export const ADMIN_BADGE =
  "mx-auto mb-16 flex w-fit items-center gap-8 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 py-6 pr-14 pl-6 text-[12px] font-semibold tracking-[0.4px] text-[#ea580c] uppercase dark:text-[#fb923c]";

/** The cabinet's glass cards turn grey on the dark panel; keep them near-white. */
export const ADMIN_CARD = "bg-white/92";
