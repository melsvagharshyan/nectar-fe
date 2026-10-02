import { Button, Empty } from "../../../components/ui";
import type { Request } from "../../../demo/types";
import type { WorkspaceModel } from "../utils/hooks";
import { CAROUSEL } from "../utils/styles";
import { OfferCard } from "./OfferCard";

export function OffersCarousel({
  model: m,
  request,
  admin,
}: {
  model: WorkspaceModel;
  request: Request;
  admin: boolean;
}) {
  const hasOffers = m.offers.length > 0;
  return (
    <div className={`carousel ${CAROUSEL}`} ref={m.carousel}>
      {m.visibleOffers.map((o) => (
        <OfferCard key={o.id} model={m} offer={o} request={request} />
      ))}
      {!m.visibleOffers.length && (
        <Empty
          className="col-span-full"
          text={
            hasOffers
              ? "Нет предложений по фильтру"
              : "Предложения пока не получены"
          }
        >
          {hasOffers && (
            <Button onClick={m.resetOfferFilters}>Сбросить фильтры</Button>
          )}
          {request.stage === "created" && !admin && (
            <Button
              variant="primary"
              onClick={() =>
                m.dispatch({
                  type: "START",
                  actor: m.actor,
                  requestId: request.id,
                })
              }
            >
              Начать подбор
            </Button>
          )}
        </Empty>
      )}
    </div>
  );
}
