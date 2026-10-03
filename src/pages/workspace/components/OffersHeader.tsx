import { Button, Icon, Tabs, type TabItem } from "../../../components/ui";
import type { Request } from "../../../demo/types";
import { money } from "../../../utils/helpers";
import type { WorkspaceModel } from "../utils/hooks";
import { OFFER_TABS, OFFERS_HEAD } from "../utils/styles";
import type { OfferTab } from "../utils/types";
import { OfferFiltersPanel } from "./OfferFiltersPanel";

export function OffersHeader({
  model: m,
  request,
}: {
  model: WorkspaceModel;
  request: Request;
}) {
  const tabs: TabItem<OfferTab>[] = [
    { id: "all", label: "Все предложения", count: m.tabCounts.all },
    { id: "selected", label: "Выбранные", count: m.tabCounts.selected },
    { id: "rejected", label: "Не подходят", count: m.tabCounts.rejected },
  ];
  return (
    <div className={OFFERS_HEAD}>
      <div className="flex items-start justify-between gap-12">
        <div className="min-w-0">
          <h2 className="offers-heading text-[19px] tracking-[-0.3px] max-xs:text-[16px]">
            Подходящие объекты{" "}
            <span className="font-code text-[13px] font-medium text-faint">
              · {request.id}
            </span>
          </h2>
          <p className="mt-4 text-[13px] text-muted max-xs:text-[12px]">
            {request.type} · {request.districts.join(" / ")} · до{" "}
            {money(request.budgetMax)}
          </p>
        </div>
        <Button
          selected={m.showOfferFilters}
          aria-label="Фильтры предложений"
          aria-expanded={m.showOfferFilters}
          className="shrink-0 border-line bg-surface max-xs:px-9"
          onClick={m.toggleOfferFilters}
        >
          <Icon name="filter" className="size-15" />
          <span className="max-xs:hidden">Фильтры</span>
        </Button>
      </div>
      <Tabs
        items={tabs}
        value={m.offerTab}
        onChange={m.setOfferTab}
        classNames={OFFER_TABS}
      />
      {m.showOfferFilters && (
        <OfferFiltersPanel control={m.offerForm.control} />
      )}
    </div>
  );
}
