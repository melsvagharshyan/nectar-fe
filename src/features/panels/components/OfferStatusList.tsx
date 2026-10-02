import { Button } from "../../../components/ui";
import type { OfferStatusItem } from "../utils/types";
import { RECORD } from "../../../utils/styles";

export function OfferStatusList({ items }: { items: OfferStatusItem[] }) {
  return (
    <>
      {items.map((item) => (
        <div className={RECORD} key={item.id}>
          <Button variant="link" onClick={item.onOpen}>
            {item.linkLabel}
          </Button>
          <span>{item.status}</span>
        </div>
      ))}
    </>
  );
}
