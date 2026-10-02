import { useState } from "react";
import { closePanel } from "../../../app/router";
import {
  canSeeRequest,
  requiresAttention,
  visibleEvents,
} from "../../../demo/selectors";
import { Badge, Button, Empty, Overlay, Tabs } from "../../../components/ui";
import { EVENT_NAMES } from "../../../utils/constants";
import { CRM_EVENT_TYPES, NOTIFICATION_FILTERS } from "../utils/constants";
import { isReadByRole } from "../utils/helpers";
import { usePanelContext } from "../utils/hooks";
import type { NotificationFilter, PanelProps } from "../utils/types";
import { RECORD } from "../../../utils/styles";

export function NotificationsPanel({ role }: Pick<PanelProps, "role">) {
  const { state, dispatch, actor, goToRequest } = usePanelContext(role);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const attentionRequests = state.requests.filter(
    (r) => canSeeRequest(state, actor, r) && requiresAttention(state, r),
  );
  const events = visibleEvents(state, actor).filter(
    (e) =>
      filter !== "attention" &&
      (filter !== "new" || !isReadByRole(state, role, e.id)) &&
      (filter !== "crm" || CRM_EVENT_TYPES.includes(e.type)),
  );
  const isEmpty =
    !events.length && (filter !== "attention" || !attentionRequests.length);

  return (
    <Overlay title="Уведомления" onClose={closePanel}>
      <Tabs items={NOTIFICATION_FILTERS} value={filter} onChange={setFilter} />
      {events
        .slice()
        .reverse()
        .map((e) => (
          <div className={RECORD} key={e.id}>
            <div>
              <strong>{EVENT_NAMES[e.type]}</strong>
              <p className="text-muted">{e.requestId}</p>
              {!isReadByRole(state, role, e.id) && <Badge value="Новое" />}
            </div>
            <Button
              onClick={() => {
                dispatch({ type: "READ_EVENT", actor, eventId: e.id });
                goToRequest(e.requestId);
              }}
            >
              Открыть
            </Button>
          </div>
        ))}
      {filter === "attention" &&
        attentionRequests.map((r) => (
          <div className={RECORD} key={r.id}>
            <div>
              <strong>{r.id}</strong>
              <p className="text-muted">Предложения не получены более 24 часов</p>
            </div>
            <Button onClick={() => goToRequest(r.id)}>Открыть</Button>
          </div>
        ))}
      {isEmpty && <Empty text="Новых уведомлений нет" />}
    </Overlay>
  );
}
