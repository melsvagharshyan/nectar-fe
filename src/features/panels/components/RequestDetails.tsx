import { useState } from "react";
import { panel } from "../../../app/router";
import { offerPresentation } from "../../../demo/selectors";
import type { Request, Role } from "../../../demo/types";
import { RequestSummary } from "../../../components/RequestSummary";
import { Timeline } from "../../../components/Timeline";
import { Badge, Button, OverlayFooter } from "../../../components/ui";
import {
  OPEN_REQUEST_STAGES,
  SUBMITTABLE_REQUEST_STAGES,
} from "../../../utils/constants";
import { cn, formatDate } from "../../../utils/helpers";
import { clientOf } from "../utils/helpers";
import { usePanelContext } from "../utils/hooks";
import type { PanelProps } from "../utils/types";
import { AdminRequestInfo } from "./AdminRequestInfo";
import { OfferStatusList } from "./OfferStatusList";
import { ReviewRejectDialog } from "./ReviewRejectDialog";
import { BOX, DETAILS_GRID, ERROR_BOX, NOTICE, ROW } from "../../../utils/styles";

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
  const [isRejectOpen, setRejectOpen] = useState(false);
  const client = clientOf(state, request.clientId);
  const canSubmit =
    role === "broker" && SUBMITTABLE_REQUEST_STAGES.includes(request.stage);
  const canReview = role === "admin" && request.stage === "pending_review";
  // The admin's reason is shown only while the latest reservation is the returned one.
  const latestTransfer = state.transfers
    .filter((t) => t.requestId === request.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  const lastReturn =
    OPEN_REQUEST_STAGES.includes(request.stage) &&
    latestTransfer?.state === "returned" &&
    latestTransfer.returnReason
      ? latestTransfer
      : undefined;
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
      {role !== "partner" && request.stage === "pending_review" && (
        <p className={cn(NOTICE, "mt-20")}>
          {role === "admin"
            ? "Брокер ждёт решения. После одобрения запрос увидят армянские партнёры."
            : "Запрос на проверке у администратора. Партнёры увидят его после одобрения."}
        </p>
      )}
      {role !== "partner" && lastReturn && (
        <div className={cn(NOTICE, "mt-20")}>
          <strong>Администратор вернул резерв {lastReturn.id} в работу</strong>
          <p className="mt-4">{lastReturn.returnReason}</p>
        </div>
      )}
      {role !== "partner" && request.stage === "rejected" && (
        <div className={cn(ERROR_BOX, "mt-20 text-[12px]")}>
          <strong>Запрос отклонён администратором</strong>
          {request.rejectReason && <p className="mt-4">{request.rejectReason}</p>}
          {role === "broker" && (
            <p className="mt-4">Исправьте запрос и отправьте его повторно.</p>
          )}
        </div>
      )}
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
        {canSubmit && (
          <Button
            variant="primary"
            onClick={async () => {
              const { error } = await dispatch({
                type: "SUBMIT",
                actor,
                requestId: request.id,
              });
              if (!error)
                toast(
                  "Запрос отправлен на проверку",
                  "Партнёры увидят его после одобрения администратором",
                );
            }}
          >
            Отправить на проверку
          </Button>
        )}
        {canReview && (
          <>
            <Button onClick={() => setRejectOpen(true)}>Отклонить</Button>
            <Button
              variant="primary"
              onClick={async () => {
                const { error } = await dispatch({
                  type: "APPROVE_REQUEST",
                  actor,
                  requestId: request.id,
                });
                if (!error)
                  toast("Запрос одобрен", "Армянские партнёры уже видят запрос");
              }}
            >
              Одобрить
            </Button>
          </>
        )}
      </OverlayFooter>
      {isRejectOpen && (
        <ReviewRejectDialog
          title="Отклонить запрос?"
          notice="Брокер увидит причину, исправит запрос и отправит его повторно. Армянские партнёры его не увидят."
          submitLabel="Отклонить запрос"
          onCancel={() => setRejectOpen(false)}
          onConfirm={async ({ reason }) => {
            const { error } = await dispatch({
              type: "REJECT_REQUEST",
              actor,
              requestId: request.id,
              reason,
            });
            if (error) return;
            setRejectOpen(false);
            toast("Запрос отклонён", "Брокер увидит причину и сможет исправить запрос");
          }}
        />
      )}
    </>
  );
}
