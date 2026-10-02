import { panel } from "../../../app/router";
import { Button } from "../../../components/ui";
import { cn, money } from "../../../utils/helpers";
import { BOX } from "../../../utils/styles";
import { roomsLabel } from "../utils/helpers";
import type { PartnerRequest } from "../utils/types";

export function SelectionCriteria({ request: r }: { request: PartnerRequest }) {
  return (
    <div className={cn(BOX, "order-2 mt-auto p-14")}>
      <h3 className="mb-10 border-b border-line pb-8 text-[11px] font-semibold tracking-[0.6px] text-faint uppercase">
        Критерии подбора
      </h3>
      <div className="grid grid-cols-2 gap-x-16 gap-y-6 text-[12px] text-muted max-lg:grid-cols-1 [&_b]:font-semibold [&_b]:text-ink">
        <div>
          Тип недвижимости: <b>{r.type}</b>
        </div>
        <div>
          Район: <b>{r.districts.join(" / ")}</b>
        </div>
        <div>
          Цель покупки: <b>{r.goal}</b>
        </div>
        <div>
          Комнаты: <b>{roomsLabel(r.rooms)}</b>
        </div>
        <div>
          Бюджет ($):{" "}
          <b>
            {money(r.budgetMin)} — {money(r.budgetMax)}
          </b>
        </div>
        <div>
          Площадь (м²):{" "}
          <b>
            {r.areaMin} — {r.areaMax} м²
          </b>
        </div>
        <div>
          Срок: <b>{r.term}</b>
        </div>
      </div>
      <p className="mt-10 rounded-[10px] bg-subtle p-10 text-[12px] text-ink-soft">
        {r.notes}
      </p>
      <Button
        variant="link"
        className="mt-14 text-[12px] font-semibold"
        onClick={() => panel("request", { request: r.id })}
      >
        Все параметры ↗
      </Button>
    </div>
  );
}
