import { Empty } from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { COLUMN, COLUMN_VISIBLE } from "../../../utils/styles";
import type { WorkspaceModel } from "../utils/hooks";
import { OFFERS_COLUMN } from "../utils/styles";
import { OffersActionBar } from "./OffersActionBar";
import { OffersCarousel } from "./OffersCarousel";
import { OffersHeader } from "./OffersHeader";

export function OffersColumn({
  model: m,
  admin,
}: {
  model: WorkspaceModel;
  admin: boolean;
}) {
  const { request } = m;
  return (
    <section
      className={cn(
        "offers-column",
        COLUMN,
        m.step === 1 && COLUMN_VISIBLE,
        OFFERS_COLUMN,
      )}
    >
      {request ? (
        <>
          <OffersHeader model={m} request={request} />
          <OffersCarousel model={m} request={request} admin={admin} />
          <OffersActionBar model={m} request={request} admin={admin} />
        </>
      ) : (
        <Empty text="Выберите клиента и запрос" />
      )}
    </section>
  );
}
