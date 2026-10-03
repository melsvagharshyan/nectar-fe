import { useState } from "react";
import { useGetCompaniesInfiniteQuery } from "../../../api/companies-api-ts/companiesApi";
import type { TabItem } from "../../../components/ui";
import { useFilterForm } from "../../../utils/hooks";
import { COMPANY_KIND_LABELS } from "./constants";
import type { CompanyKind } from "./types";

export function useCompanies() {
  const [kind, setKind] = useState<CompanyKind>("rf");
  const searchForm = useFilterForm({ search: "" });
  const query = useGetCompaniesInfiniteQuery({
    kind,
    search: searchForm.values.search,
  });
  const pages = query.data?.pages;
  const counts = pages?.[0]?.counts;
  const tabs: TabItem<CompanyKind>[] = (["rf", "am"] as const).map((id) => ({
    id,
    label: `${COMPANY_KIND_LABELS[id]} · ${counts?.[id] ?? 0}`,
  }));
  return {
    kind,
    setKind,
    tabs,
    searchControl: searchForm.control,
    companies: pages?.flatMap((p) => p.items) ?? [],
    loading: query.isFetching && !query.isFetchingNextPage,
    loadingMore: query.isFetchingNextPage,
    hasMore: query.hasNextPage,
    loadMore: () => void query.fetchNextPage(),
  };
}
