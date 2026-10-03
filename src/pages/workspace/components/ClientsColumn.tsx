import { Controller } from "react-hook-form";
import { panel } from "../../../app/router";
import { Button, Empty, Icon, InfiniteList, Search } from "../../../components/ui";
import { COUNT } from "../../../components/ui/Count";
import { requiresAttention } from "../../../demo/selectors";
import { cn } from "../../../utils/helpers";
import { COLUMN, COLUMN_VISIBLE } from "../../../utils/styles";
import type { WorkspaceModel } from "../utils/hooks";
import {
  CLIENT_FILTER,
  CLIENT_TABS,
  CLIENTS_COLUMN,
  COLUMN_TITLE,
  COUNT_BUTTON,
  COUNT_TONE,
  HEAD,
  NEW_ITEM_BUTTON,
  TOOLS,
} from "../utils/styles";
import { ClientFiltersPanel } from "./ClientFiltersPanel";
import { ClientTab } from "./ClientTab";

export function ClientsColumn({
  model: m,
  admin,
}: {
  model: WorkspaceModel;
  admin: boolean;
}) {
  const { manager, stage } = m.clientForm.values;
  return (
    <section className={cn(COLUMN, m.step === 0 && COLUMN_VISIBLE, CLIENTS_COLUMN)}>
      <div className={HEAD}>
        <h2 className={COLUMN_TITLE}>
          Клиенты
          <Button
            className={cn(COUNT, COUNT_TONE, COUNT_BUTTON)}
            aria-label="Открыть список клиентов и запросов"
            onClick={() => panel("directory", { company: m.company })}
          >
            {m.clientsPaging.total} ↗
          </Button>
        </h2>
        {!admin && (
          <Button
            variant="primary"
            className={NEW_ITEM_BUTTON}
            onClick={() => panel("client-form")}
          >
            <Icon name="plus" className="size-15" />
            Новый клиент
          </Button>
        )}
      </div>
      <div className={TOOLS}>
        <Controller
          name="search"
          control={m.clientForm.control}
          render={({ field }) => (
            <Search
              {...field}
              label="Поиск клиента"
              className="pr-40"
            />
          )}
        />
        <Button
          variant="ghost"
          selected={!!(manager || stage)}
          className={CLIENT_FILTER}
          aria-label="Фильтры клиентов"
          title="Фильтры клиентов"
          onClick={m.toggleClientFilters}
        >
          <Icon name="filter" className="size-14" />
          Фильтры {manager || stage ? "· активны" : ""}
        </Button>
        {m.showClientFilters && (
          <ClientFiltersPanel
            control={m.clientForm.control}
            employees={m.data.employees}
          />
        )}
      </div>
      <InfiniteList
        className={CLIENT_TABS}
        hasMore={m.clientsPaging.hasMore}
        loading={m.clientsPaging.loadingMore}
        onLoadMore={m.clientsPaging.loadMore}
      >
        {m.clients.map((c, index) => {
          const clientRequests = m.data.requests.filter(
            (r) => r.clientId === c.id,
          );
          return (
            <ClientTab
              key={c.id}
              client={c}
              index={index}
              active={m.client?.id === c.id}
              requests={clientRequests}
              activeRequestId={m.request?.id}
              offerCount={(requestId) =>
                m.data.offers.filter((o) => o.requestId === requestId).length
              }
              attention={clientRequests.some((r) =>
                requiresAttention(m.state, r),
              )}
              onSelect={() => {
                m.select(c.id);
                m.setStep(1);
              }}
              onSelectRequest={(requestId) => {
                m.select(c.id, requestId);
                m.setStep(2);
              }}
            />
          );
        })}
        {!m.clients.length && !m.clientsPaging.loading && (
          <Empty text="Клиенты не найдены">
            <Button onClick={m.resetClientFilters}>Сбросить фильтры</Button>
          </Empty>
        )}
      </InfiniteList>
    </section>
  );
}
