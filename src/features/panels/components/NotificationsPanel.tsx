import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { closePanel } from "../../../app/router";
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
              <p className="text-muted">{e.requestId}</p>
            </div>
            <Button
              onClick={() => {
                if (!e.read) void dispatch({ type: "READ_EVENT", actor, eventId: e.id });
                goToRequest(e.requestId);
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
