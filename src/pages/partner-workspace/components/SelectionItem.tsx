import { Button } from "../../../components/ui";
import { money } from "../../../utils/helpers";
import type { PartnerProperty } from "../utils/types";

export function SelectionItem({
  property: p,
  onRemove,
}: {
  property: PartnerProperty;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[14px] border border-line bg-surface p-14 shadow-card">
      <small className="font-code">
        {p.id} · {p.district}
      </small>
      <h3 className="mt-4 text-[17px] font-bold">{money(p.price)}</h3>
      <p className="text-[13px] text-muted">
        {p.title} · {p.area} м²
      </p>
      <Button className="mt-10 text-[12px]" onClick={onRemove}>
        Убрать из подборки
      </Button>
    </div>
  );
}
