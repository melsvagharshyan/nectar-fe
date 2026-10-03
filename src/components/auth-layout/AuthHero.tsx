import { Icon, Logo } from "../ui";
import { asset, cn } from "../../utils/helpers";
import {
  AUTH_HERO_IMAGE,
  AUTH_HERO_TAGLINE,
  HERO_CARD,
  HERO_GLASS,
  HERO_ICON_CHIP,
} from "./constants";

/** Decorative left panel of the auth screens; hidden below the `lg` breakpoint. */
export function AuthHero() {
  return (
    <aside
      aria-hidden="true"
      className="relative overflow-hidden rounded-[20px] bg-[#fff7ed] shadow-[0_30px_70px_-30px_rgb(124_45_18/0.45)] max-lg:hidden"
    >
      <img
        src={asset(AUTH_HERO_IMAGE)}
        alt=""
        className="absolute inset-0 size-full object-cover object-[50%_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgb(124_45_18/0.45)_76%,rgb(15_23_42/0.88)_100%)]" />

      <div className={cn("absolute top-24 left-24 rounded-[12px] py-6 pr-14 pl-6", HERO_GLASS)}>
        <Logo className="text-[17px]" />
      </div>

      <div className={cn(HERO_CARD, "top-[22%] right-24 w-[210px]")}>
        <span className="flex items-center gap-8 text-[11px] font-semibold tracking-[0.4px] text-[#9a3412] uppercase">
          <span className={cn(HERO_ICON_CHIP, "size-20")}>
            <Icon name="pin" className="size-12" />
          </span>
          Новый запрос
        </span>
        <strong className="mt-8 block text-[14px]">3-комн. · Арабкир</strong>
        <span className="text-[12px] text-[#334155]">до $200 000 · 80–120 м²</span>
      </div>

      <div className={cn(HERO_CARD, "top-[44%] left-24 flex items-center gap-10")}>
        <span className={cn(HERO_ICON_CHIP, "size-36")}>
          <Icon name="chart" className="size-16" />
        </span>
        <span>
          <strong className="block text-[20px] leading-none text-[#ea580c]">
            98%
          </strong>
          <span className="text-[11px] text-[#334155]">совпадение с запросом</span>
        </span>
      </div>

      <div className={cn(HERO_CARD, "right-24 bottom-[30%] flex items-center gap-8 py-9")}>
        <span className="grid size-20 place-items-center rounded-[6px] bg-[#16a34a] text-white">
          <Icon name="deal" className="size-12" />
        </span>
        <span className="text-[12px] font-semibold">Сделка передана в CRM</span>
      </div>

      <div className="absolute right-32 bottom-32 left-32 text-white">
        <span className="mb-12 block h-3 w-40 rounded-[2px] bg-[#f97316]" />
        <h2 className="max-w-[420px] text-[26px] leading-[1.15] font-bold tracking-[-0.6px]">
          {AUTH_HERO_TAGLINE.title}
        </h2>
        <p className="mt-10 max-w-[400px] text-[14px] text-white/80">{AUTH_HERO_TAGLINE.text}</p>
      </div>
    </aside>
  );
}
