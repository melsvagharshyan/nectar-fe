import { Controller } from "react-hook-form";
import { Select } from "../../../components/form";
import { RequestSummary } from "../../../components/RequestSummary";
import {
  Badge,
  Button,
  Count,
  Empty,
  InfiniteList,
  Search,
} from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { COLUMN, COLUMN_VISIBLE, SCROLL, SELECT_TAB } from "../../../utils/styles";
import { PARTNER_REQUEST_FILTER_OPTIONS } from "../utils/constants";
import type { PartnerWorkspaceModel } from "../utils/hooks";
import {
  COLUMN_FRAME,
  EYEBROW,
  HEAD,
  REQUEST_TAB,
  REQUEST_TAB_ACTIVE,
  SELECT,
  TOOLS,
} from "../utils/styles";

export function PartnerRequestsColumn({
  model: m,
}: {
  model: PartnerWorkspaceModel;
}) {
  const { control } = m.filterForm;
  return (
    <section className={cn(COLUMN, m.step === 0 && COLUMN_VISIBLE, COLUMN_FRAME)}>
      <div className={HEAD}>
        <h2 className={EYEBROW}>
          Запросы
          <Count>{m.requestsPaging.total}</Count>
        </h2>
      </div>
      <div className={TOOLS}>
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <Search {...field} label="ID или район запроса" />
          )}
        />
        <Controller
          name="filter"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className={SELECT}
              aria-label="Фильтр запросов партнёра"
              options={PARTNER_REQUEST_FILTER_OPTIONS}
            />
          )}
        />
      </div>
      <InfiniteList
        className={cn(SCROLL, "p-14")}
        hasMore={m.requestsPaging.hasMore}
        loading={m.requestsPaging.loadingMore}
        onLoadMore={m.requestsPaging.loadMore}
      >
        {m.requests.map((q) => (
          <div
            className={cn(REQUEST_TAB, m.request?.id === q.id && REQUEST_TAB_ACTIVE)}
            key={q.id}
          >
            <Button className={SELECT_TAB} onClick={() => m.selectRequest(q.id)}>
              <div className="mb-8 flex flex-wrap items-center gap-6">
                <span className="rounded-full bg-accent-tint px-8 py-2 font-code text-[11px] font-semibold text-accent-text">
                  {q.id}
                </span>
                <Badge value={q.stage} />
              </div>
              <small>Клиент #{q.publicClientId.replace("CL-", "")}</small>
              <div className="mt-12">
                <RequestSummary request={q} variant="partner" />
              </div>
            </Button>
          </div>
        ))}
        {!m.requests.length && !m.requestsPaging.loading && (
          <Empty text="Запросы не найдены">
            <Button onClick={m.resetFilters}>Сбросить фильтры</Button>
          </Empty>
        )}
      </InfiniteList>
    </section>
  );
}
