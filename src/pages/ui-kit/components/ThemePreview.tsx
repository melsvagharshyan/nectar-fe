import { Avatar, Badge, Button, Icon } from "../../../components/ui";
import type { Theme } from "../../../utils/types";
import { cn } from "../../../utils/helpers";

const THEME_LABELS: Record<Theme, string> = {
  light: "Светлая тема",
  dark: "Тёмная тема",
};

export function ThemePreview({ theme }: { theme: Theme }) {
  return (
    <div className={cn(theme, "rounded-[18px] border border-line bg-page p-18")}>
      <span className="mb-12 block text-[11px] font-semibold tracking-[0.6px] text-faint uppercase">
        {THEME_LABELS[theme]}
      </span>
      <div className="flex flex-col gap-12 rounded-[14px] border border-line bg-surface p-16 shadow-card">
        <div className="flex items-center gap-10">
          <Avatar name="Елена Морозова" className="size-40" />
          <div className="min-w-0 flex-1">
            <strong className="block text-[14px]">Елена Морозова</strong>
            <small>+7 (000) 000-00-01</small>
          </div>
          <Badge value="has_offers" />
        </div>
        <div className="rounded-[12px] border border-accent-edge bg-accent-tint p-12">
          <strong className="text-[15px]">$0–$220 000</strong>
          <p className="text-[12px] text-muted">3-комн. квартира · Арабкир</p>
        </div>
        <div className="flex gap-8">
          <Button className="flex-1">Отказ</Button>
          <Button variant="primary" className="flex-1">
            <Icon name="deal" className="size-15" />
            Сделка
          </Button>
        </div>
      </div>
    </div>
  );
}
