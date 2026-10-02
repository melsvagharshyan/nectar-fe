import { useState } from "react";
import { closePanel } from "../../../app/router";
import { activeTransfer, selectedOffers } from "../../../demo/selectors";
import { Overlay, OverlayFooter } from "../../../components/ui";
import { cn, formatDate, money } from "../../../utils/helpers";
import { clientOf, companyNameOf } from "../utils/helpers";
import { usePanelContext } from "../utils/hooks";
import type {
  PanelProps,
  TransferConfirmMode,
  TransferConfirmValues,
} from "../utils/types";
import { DeniedNotice } from "./DeniedNotice";
import { TransferActions } from "./TransferActions";
import { TransferConfirmDialog } from "./TransferConfirmDialog";
import { ERROR_BOX, NOTICE, RECORD } from "../../../utils/styles";

export function TransferPanel({ role, toast }: PanelProps) {
  const { state, dispatch, actor, params, request } = usePanelContext(role);
  const [confirmMode, setConfirmMode] = useState<TransferConfirmMode | null>(
    null,
  );
  const transfer = request ? activeTransfer(state, request.id) : undefined;
  const offers = request
    ? transfer
      ? transfer.offerIds.map((id) => state.offers.find((o) => o.id === id)!)
      : selectedOffers(state, request.id)
    : [];
  const properties = offers.map(
    (o) => state.properties.find((p) => p.id === o.propertyId)!,
  );
  const client = request ? clientOf(state, request.clientId) : undefined;

  const showTransfer = async () => {
    const { error } = await dispatch({
      type: "TRANSFER",
      actor,
      requestId: params.requestId,
    });
    if (!error) toast("Запрос передан в CRM");
  };

  const confirm = async (values: TransferConfirmValues) => {
    if (!transfer) return;
    const isSold = confirmMode === "sold";
    const { error } = await dispatch(
      isSold
        ? {
            type: "SELL",
            actor,
            transferId: transfer.id,
            propertyId: values.soldPropertyId,
          }
        : { type: "RETURN", actor, transferId: transfer.id },
    );
    setConfirmMode(null);
    if (error) return;
    toast(isSold ? "Сделка завершена" : "Запрос возвращён в работу");
    closePanel();
  };

  return (
    <>
      <Overlay
        title={transfer ? `Передача ${transfer.id}` : "Передать в CRM"}
        modal
        onClose={closePanel}
      >
        {request && role !== "partner" ? (
          <>
            <p className={NOTICE}>
              Администратор платформы проведёт сделку или вернёт запрос в работу.
            </p>
            <h3 className="mt-20">
              {params.requestId} · {client?.name}
            </h3>
            {role === "admin" && (
              <p className="text-muted mt-20">
                {companyNameOf(state, client?.companyId)}
                {transfer ? " · " + formatDate(transfer.createdAt) : ""}
              </p>
            )}
            {properties.map((p, i) => (
              <div className={RECORD} key={offers[i].id}>
                <div>
                  <strong>
                    {p.id} · {p.district}
                  </strong>
                  <small>
                    {p.availability === "sold" ? "Недоступен · продан" : p.title}
                  </small>
                </div>
                <span>{money(p.price)}</span>
              </div>
            ))}
            {state.error && <p className={cn(ERROR_BOX, "mt-20")}>{state.error}</p>}
            <OverlayFooter>
              <TransferActions
                role={role}
                hasTransfer={!!transfer}
                canTransfer={!!offers.length && request.stage !== "sold"}
                onTransfer={showTransfer}
                onConfirm={setConfirmMode}
              />
            </OverlayFooter>
          </>
        ) : (
          <DeniedNotice />
        )}
      </Overlay>
      {confirmMode && transfer && (
        <TransferConfirmDialog
          mode={confirmMode}
          properties={properties}
          onCancel={() => setConfirmMode(null)}
          onConfirm={confirm}
        />
      )}
    </>
  );
}
