import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { closePanel, navigate, panel } from "../../../app/router";
import type { DemoEvent, Role } from "../../../demo/types";
import {
  Button,
  Empty,
  InfiniteList,
  Overlay,
  Tabs,
} from "../../../components/ui";
import { EVENT_NAMES } from "../../../utils/constants";
import { cn } from "../../../utils/helpers";
import { NOTIFICATION_FILTERS } from "../utils/constants";
import { useNotificationFeed, usePanelContext } from "../utils/hooks";
import { UnreadDot } from "./UnreadDot";
import type { NotificationFilter, PanelProps } from "../utils/types";
import { RECORD } from "../../../utils/styles";

/** Review notifications open where the reader acts on them, not the workspace. */
function reviewTarget(role: Role, e: DemoEvent): (() => void) | undefined {
  const request = () => panel("request", { request: e.requestId });
  if (role === "admin" && e.type === "request_submitted") return request;
  if (role === "admin" && e.type === "offer_submitted")
    return () => navigate("/admin/workspace", { view: "offer-review" });
  if (role === "broker" && e.type === "request_rejected") return request;
  if (role === "partner" && e.type === "offer_rejected")
    return () => navigate("/partner/offers");
  return undefined;
}

export function NotificationsPanel({ role }: Pick<PanelProps, "role">) {
  const { dispatch, actor, goToRequest } = usePanelContext(role);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const feed = useNotificationFeed(filter);
  const isEmpty =
    !feed.loading && !feed.events.length && !feed.attentionRequests.length;

  return (
    <Overlay
      title="Уведомления"
      onClose={closePanel}
      actions={
        feed.canReadAll && (
          <Button
            variant="secondary"
            onClick={() => void dispatch({ type: "READ_ALL_EVENTS", actor })}
          >
            <FiCheckCircle />
            Прочитать все
          </Button>
        )
      }
    >
      <Tabs items={NOTIFICATION_FILTERS} value={filter} onChange={setFilter} />
      <InfiniteList
        hasMore={feed.hasMore}
        loading={feed.loading || feed.loadingMore}
        onLoadMore={feed.loadMore}
      >
        {feed.events.map((e) => (
          <div className={RECORD} key={e.id}>
            <div>
              <strong
                className={cn(
                  "flex items-center gap-8",
                  e.read && "font-medium text-muted",
                )}
              >
                {!e.read && <UnreadDot />}
                {EVENT_NAMES[e.type]}
              </strong>
              <p className="text-muted">
                {e.requestId}
                {e.propertyId && ` · ${e.propertyId}`}
              </p>
            </div>
            <Button
              onClick={() => {
                if (!e.read) void dispatch({ type: "READ_EVENT", actor, eventId: e.id });
                (reviewTarget(role, e) ?? (() => goToRequest(e.requestId)))();
              }}
            >
              Открыть
            </Button>
          </div>
        ))}
        {feed.attentionRequests.map((r) => (
          <div className={RECORD} key={r.id}>
            <div>
              <strong>{r.id}</strong>
              <p className="text-muted">Предложения не получены более 24 часов</p>
            </div>
            <Button onClick={() => goToRequest(r.id)}>Открыть</Button>
          </div>
        ))}
      </InfiniteList>
      {isEmpty && <Empty text="Новых уведомлений нет" />}
    </Overlay>
  );
}
