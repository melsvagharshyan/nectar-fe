import { useMemo, useState } from "react";
import {
  useGetPropertiesFeedInfiniteQuery,
  useGetPropertiesTableQuery,
} from "../../../api/properties-api-ts/propertiesApi";
import type { PropertyListMeta } from "../../../api/properties-api-ts/types";
import { useDemo, useScopedState } from "../../../app/DemoProvider";
import { useRoute } from "../../../app/router";
import type { Role } from "../../../demo/types";
import { DISTRICTS, PAGE_SIZE } from "../../../utils/constants";
import { useFilterForm, usePagedArgs } from "../../../utils/hooks";
import { EMPTY_CATALOG_FILTERS } from "./constants";
import type { CatalogStatus, CatalogView } from "./types";
export function useCatalog(role: Role) {
  const [base] = useDemo();
  const { params } = useRoute();
  const [status, setStatus] = useState(
    (params.get("stage") || "") as CatalogStatus,
  );
  const [view, setView] = useState(
    (params.get("view") || (role === "broker" ? "grid" : "table")) as CatalogView,
  );
  const [showFilters, setShowFilters] = useState(false);
  const filterForm = useFilterForm({
    ...EMPTY_CATALOG_FILTERS,
    company: params.get("company") || "",
  });

  const args = {
    ...filterForm.values,
    company: role === "admin" ? filterForm.values.company : undefined,
    status: status || undefined,
    limit: PAGE_SIZE,
  };
  const paged = usePagedArgs(args);
  const table = useGetPropertiesTableQuery(paged.args, { skip: view !== "table" });
  const feed = useGetPropertiesFeedInfiniteQuery(args, { skip: view !== "grid" });

  const pages = feed.data?.pages;
  const isGrid = view === "grid";
  const source = isGrid ? pages?.[0] : table.data;
  const meta: Omit<PropertyListMeta, "districts"> = {
    total: source?.total ?? 0,
    statusCounts: source?.statusCounts ?? {},
  };
  const slice = useMemo(
    () =>
      isGrid
        ? {
            properties: pages?.flatMap((p) => p.items) ?? [],
            offers: pages?.flatMap((p) => p.offers) ?? [],
          }
        : { properties: table.data?.items ?? [], offers: table.data?.offers ?? [] },
    [isGrid, pages, table.data],
  );
  const state = useScopedState([slice]);
  const overall = Object.values(meta.statusCounts).reduce((sum, n) => sum + (n ?? 0), 0);

  return {
    state,
    offers: slice.offers,
    properties: slice.properties,
    total: meta.total,
    overall,
    statusCounts: meta.statusCounts,
    districts: DISTRICTS,
    loading: isGrid ? feed.isLoading : table.isFetching,
    paging: {
      page: paged.page,
      pageSize: PAGE_SIZE,
      total: meta.total,
      onChange: paged.setPage,
    },
    feed: {
      hasMore: feed.hasNextPage,
      loading: feed.isFetchingNextPage,
      loadMore: () => void feed.fetchNextPage(),
    },
    partnerCompanies: base.companies.filter((c) => c.kind === "am"),
    control: filterForm.control,
    status,
    setStatus,
    view,
    setView,
    showFilters,
    toggleFilters: () => setShowFilters((v) => !v),
    reset: () => {
      filterForm.reset(EMPTY_CATALOG_FILTERS);
      setStatus("");
    },
  };
}
