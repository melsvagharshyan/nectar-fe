import { panel } from "../../../app/router";
import { offerPresentation } from "../../../demo/selectors";
import type { Request, Role } from "../../../demo/types";
import { RequestSummary } from "../../../components/RequestSummary";
import { Timeline } from "../../../components/Timeline";
import { Badge, Button, OverlayFooter } from "../../../components/ui";
import { cn, formatDate } from "../../../utils/helpers";
import { clientOf } from "../utils/helpers";
import { usePanelContext } from "../utils/hooks";
import type { PanelProps } from "../utils/types";
import { AdminRequestInfo } from "./AdminRequestInfo";
import { OfferStatusList } from "./OfferStatusList";
import { BOX, DETAILS_GRID, ROW } from "../../../utils/styles";

export function RequestDetails({
  role,
  request,
  toast,
}: {
  role: Role;
  request: Request;
  toast: PanelProps["toast"];
}) {
  const { state, dispatch, projected, actor, goToRequest } =
    usePanelContext(role);
  const client = clientOf(state, request.clientId);
  const offerItems = projected.offers
    .filter((o) => o.requestId === request.id)
    .map((o) => ({
      id: o.id,
      linkLabel: o.propertyId,
      status: offerPresentation(
        state,
        state.offers.find((x) => x.id === o.id)!,
        actor,
      ).label,
      onOpen: () => panel("property", { object: o.propertyId }),
    }));

  return (
    <>
      <div className={cn(ROW, "justify-between")}>
        <Badge value={request.stage} />
        <small>Создан {formatDate(request.createdAt)}</small>
      </div>
      <div className={cn(BOX, "mt-20")}>
        <RequestSummary
          request={projected.requests.find((r) => r.id === request.id)!}
        />
      </div>
      {role !== "partner" && <p className="mt-20">{client?.name}</p>}
      {role === "admin" && <AdminRequestInfo state={state} client={client} />}
      <dl className={DETAILS_GRID}>
        <div>
          <dt>Цель</dt>
          <dd>{request.goal}</dd>
        </div>
        <div>
          <dt>Срок</dt>
          <dd>{request.term}</dd>
        </div>
      </dl>
      <h3>Пожелания клиента</h3>
      <p className="text-muted mt-20">{request.notes}</p>
      <h3 className="mt-20">Полученные предложения</h3>
      <OfferStatusList items={offerItems} />
      <div className="mt-20">
        <Timeline requestId={request.id} />
      </div>
      <OverlayFooter>
        <Button onClick={() => goToRequest(request.id)}>
          Открыть рабочий экран
        </Button>
        {role === "broker" && request.stage === "created" && (
          <Button
            variant="primary"
            onClick={async () => {
              const { error } = await dispatch({
                type: "START",
                actor,
                requestId: request.id,
              });
              if (!error)
                toast("Подбор начат", "Армянские партнёры уже видят запрос");
            }}
          >
            Начать подбор
          </Button>
        )}
      </OverlayFooter>
    </>
  );
}
