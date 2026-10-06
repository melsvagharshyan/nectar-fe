import { useState } from "react";
import { closePanel } from "../../../app/router";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { OPEN_REQUEST_STAGES } from "../../../utils/constants";
import { currentCompanyId, money } from "../../../utils/helpers";
import { usePanelContext } from "../utils/hooks";
import type { PanelProps } from "../utils/types";
import { DeniedNotice } from "./DeniedNotice";
import { NOTICE, RECORD } from "../../../utils/styles";

export function SendOfferPanel({ role, toast }: PanelProps) {
  const { state, dispatch, actor, params, request } = usePanelContext(role);
  const [sending, setSending] = useState(false);
  const draft = (state.drafts[params.requestId] || [])
    .map((id) =>
      state.properties.find(
        (p) => p.id === id && p.companyId === currentCompanyId(),
      ),
    )
    .filter((p) => !!p);
  const send = async () => {
    setSending(true);
    const { error } = await dispatch({
      type: "SEND_OFFERS",
      actor,
      requestId: params.requestId,
    });
    setSending(false);
    if (error) return;
    toast(
      "Предложения отправлены на проверку",
      `Объектов: ${draft.length} · брокер увидит их после одобрения администратором`,
    );
    closePanel();
  };

  return (
    <Overlay title="Отправить предложение" modal onClose={closePanel}>
      {role === "partner" && request ? (
        <>
          <p className={NOTICE}>
            Предложения сначала проверит администратор. Брокер увидит
            объекты после одобрения.
          </p>
          <h3 className="mt-20">{params.requestId}</h3>
          {draft.map((p) => (
            <div className={RECORD} key={p.id}>
              <span>
                {p.id} · {p.district}
              </span>
              <strong>{money(p.price)}</strong>
            </div>
          ))}
          <OverlayFooter>
            <Button onClick={closePanel}>Отмена</Button>
            <Button
              variant="primary"
              disabled={
                sending ||
                !draft.length ||
                !OPEN_REQUEST_STAGES.includes(request.stage)
              }
              onClick={send}
            >
              {sending ? "Отправка…" : "Отправить предложение"}
            </Button>
          </OverlayFooter>
        </>
      ) : (
        <DeniedNotice />
      )}
    </Overlay>
  );
}
