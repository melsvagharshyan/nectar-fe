import { FiShield } from "react-icons/fi";
import { HERO_CARD, HERO_ICON_CHIP } from "../../../components/auth-layout";
import { Icon, Logo } from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { ADMIN_CARD, ADMIN_HERO, ADMIN_HERO_GRID, ADMIN_HERO_TAGLINE } from "../utils/constants";

/** Decorative left panel of the admin sign-in: the review queue rather than deals. */
export function AdminHero() {
  return (
    <aside aria-hidden="true" className={ADMIN_HERO}>
      <div className={ADMIN_HERO_GRID} />

      <div className="absolute top-24 left-24 flex items-center gap-10">
        <Logo className="text-[17px] text-white" />
        <span className="rounded-full bg-white/10 px-10 py-4 text-[11px] font-semibold tracking-[0.4px] text-white/80 uppercase">
          Admin
        </span>
      </div>

      <FiShield className="absolute top-[18%] left-1/2 size-[180px] -translate-x-1/2 stroke-[0.6] text-white/[0.06]" />

      <div className={cn(HERO_CARD, ADMIN_CARD, "top-[20%] right-24 w-[220px]")}>
        <span className="flex items-center gap-8 text-[11px] font-semibold tracking-[0.4px] text-[#9a3412] uppercase">
          <span className={cn(HERO_ICON_CHIP, "size-20")}>
            <Icon name="users" className="size-12" />
          </span>
          Заявки на регистрацию
        </span>
        <strong className="mt-8 block text-[14px]">3 ожидают проверки</strong>
        <span className="text-[12px] text-[#334155]">брокеры и партнёры</span>
      </div>

      <div className={cn(HERO_CARD, ADMIN_CARD, "top-[42%] left-24 w-[230px]")}>
        <span className="flex items-center gap-8 text-[11px] font-semibold tracking-[0.4px] text-[#334155] uppercase">
          <Icon name="clock" className="size-12" />
          Запрос на проверке
        </span>
        <strong className="mt-6 block text-[14px]">3-комн. · Арабкир</strong>
        <span className="mt-8 flex gap-6">
          <span className="rounded-[6px] bg-[#16a34a] px-8 py-3 text-[11px] font-semibold text-white">
            Одобрить
          </span>
          <span className="rounded-[6px] bg-[#0f172a]/10 px-8 py-3 text-[11px] font-semibold text-[#0f172a]">
            Отклонить
          </span>
        </span>
      </div>

      <div className={cn(HERO_CARD, ADMIN_CARD, "right-24 bottom-[30%] flex items-center gap-8 py-9")}>
        <span className="grid size-20 place-items-center rounded-[6px] bg-[#16a34a] text-white">
          <Icon name="deal" className="size-12" />
        </span>
        <span className="text-[12px] font-semibold">Сделка подтверждена · продано</span>
      </div>

      <div className="absolute right-32 bottom-32 left-32">
        <span className="mb-12 block h-3 w-40 rounded-[2px] bg-[#f97316]" />
        <h2 className="max-w-[420px] text-[26px] leading-[1.15] font-bold tracking-[-0.6px]">
          {ADMIN_HERO_TAGLINE.title}
        </h2>
        <p className="mt-10 max-w-[420px] text-[14px] text-white/70">{ADMIN_HERO_TAGLINE.text}</p>
      </div>
    </aside>
  );
}
