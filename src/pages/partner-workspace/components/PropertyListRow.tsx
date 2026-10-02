import type { ReactNode } from "react";
import { Button } from "../../../components/ui";
import { cn, money } from "../../../utils/helpers";
import type { PartnerProperty } from "../utils/types";
import { BOX, ROW } from "../../../utils/styles";

export function PropertyListRow({
  property: p,
  action,
  onOpen,
}: {
  property: PartnerProperty;
  action: ReactNode;
  onOpen: () => void;
}) {
  return (
    <div className={BOX}>
      <div className={cn(ROW, "justify-between")}>
        <Button variant="link" onClick={onOpen}>
          {p.id} · {p.district}
        </Button>
        <strong>{money(p.price)}</strong>
      </div>
      <p className="text-muted">
        {p.title} · {p.area} м²
      </p>
      <div className="mt-20">{action}</div>
    </div>
  );
}
