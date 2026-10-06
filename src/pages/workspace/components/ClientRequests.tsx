import { Controller } from "react-hook-form";
import { panel } from "../../../app/router";
import { Button, Empty, Icon, InfiniteList, Search } from "../../../components/ui";
import type { WorkspaceModel } from "../utils/hooks";
import { CLIENT_REQUESTS, NEW_ITEM_BUTTON } from "../utils/styles";
import { RequestTab } from "./RequestTab";

/** Search is offered only once a client has enough requests to need it. */
const SEARCH_FROM = 4;

/** Requests of the selected client, shown inside its accordion item. */
export function ClientRequests({
  model: m,
  admin,
}: {
  model: WorkspaceModel;
  admin: boolean;
}) {
  const { query } = m.requestForm.values;
  return (
    <div className={CLIENT_REQUESTS}>
      {(m.requestsPaging.total >= SEARCH_FROM || query) && (
        <Controller
          name="query"
          control={m.requestForm.control}
          render={({ field }) => (
            <Search {...field} label="Поиск запроса" className="bg-surface" />
          )}
        />
      )}
      <InfiniteList
        className="flex flex-col gap-8"
        hasMore={m.requestsPaging.hasMore}
        loading={m.requestsPaging.loadingMore}
        onLoadMore={m.requestsPaging.loadMore}
      >
        {m.requests.map((r) => (
          <RequestTab
            key={r.id}
            request={r}
            active={m.request?.id === r.id}
            admin={admin}
            onSelect={() => {
              m.select(r.clientId, r.id);
              m.setStep(1);
            }}
          />
        ))}
        {!m.requests.length && !m.requestsPaging.loading && (
          <Empty text={query ? "Запросы не найдены" : "У клиента пока нет запросов"} />
        )}
      </InfiniteList>
      {!admin && (
        <Button
          variant="primary"
          className={NEW_ITEM_BUTTON}
          onClick={() => panel("request-form", { client: m.client?.id })}
        >
          <Icon name="plus" className="size-15" />
          Новый запрос
        </Button>
      )}
    </div>
  );
}
