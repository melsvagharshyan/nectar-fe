import { Controller } from "react-hook-form";
import { panel } from "../../../app/router";
import {
  Button,
  Count,
  Empty,
  Icon,
  InfiniteList,
  Search,
} from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { COLUMN, COLUMN_VISIBLE } from "../../../utils/styles";
import type { WorkspaceModel } from "../utils/hooks";
import {
  COLUMN_TITLE,
  COUNT_TONE,
  HEAD,
  NEW_ITEM_BUTTON,
  REQUEST_TABS,
  REQUESTS_COLUMN,
  TOOLS,
} from "../utils/styles";
import { RequestTab } from "./RequestTab";

export function RequestsColumn({
  model: m,
  admin,
}: {
  model: WorkspaceModel;
  admin: boolean;
}) {
  return (
    <section className={cn(COLUMN, m.step === 1 && COLUMN_VISIBLE, REQUESTS_COLUMN)}>
      <div className={HEAD}>
        <h2 className={COLUMN_TITLE}>
          Запросы
          <Count className={COUNT_TONE}>{m.requestsPaging.total}</Count>
        </h2>
        {!admin && (
          <Button
            variant="primary"
            className={NEW_ITEM_BUTTON}
            disabled={!m.client}
            title={!m.client ? "Сначала выберите клиента" : ""}
            onClick={() => panel("request-form", { client: m.client?.id })}
          >
            <Icon name="plus" className="size-15" />
            Новый запрос
          </Button>
        )}
      </div>
      <div className={TOOLS}>
        <Controller
          name="query"
          control={m.requestForm.control}
          render={({ field }) => (
            <Search
              {...field}
              label="Поиск запроса"
              className="bg-surface"
            />
          )}
        />
      </div>
      <InfiniteList
        className={REQUEST_TABS}
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
              m.setStep(2);
            }}
          />
        ))}
        {!m.requests.length && !m.requestsPaging.loading && (
          <Empty
            text={
              m.requestForm.values.query
                ? "Запросы не найдены"
                : "У клиента пока нет запросов"
            }
          />
        )}
      </InfiniteList>
    </section>
  );
}
