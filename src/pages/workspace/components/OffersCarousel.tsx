import { Button, Empty } from "../../../components/ui";
import type { Request } from "../../../demo/types";
import { SUBMITTABLE_REQUEST_STAGES } from "../../../utils/constants";
import type { WorkspaceModel } from "../utils/hooks";
import { CAROUSEL } from "../utils/styles";
import { OfferCard } from "./OfferCard";

const REVIEW_HINTS: Partial<Record<Request["stage"], string>> = {
  created: "Отправьте запрос на проверку, чтобы партнёры начали подбор",
  pending_review: "Запрос на проверке у администратора",
  rejected: "Запрос отклонён — исправьте его и отправьте повторно",
};

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
              : (REVIEW_HINTS[request.stage] ?? "Предложения пока не получены")
          }
        >
          {hasOffers && (
            <Button onClick={m.resetOfferFilters}>Сбросить фильтры</Button>
          )}
          {SUBMITTABLE_REQUEST_STAGES.includes(request.stage) && !admin && (
            <Button
              variant="primary"
              onClick={() =>
                m.dispatch({
                  type: "SUBMIT",
                  actor: m.actor,
                  requestId: request.id,
                })
              }
            >
              Отправить на проверку
            </Button>
          )}
        </Empty>
      )}
    </div>
  );
}
