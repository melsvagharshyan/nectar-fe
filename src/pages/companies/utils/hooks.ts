import { useState } from "react";
import { useDemo } from "../../../app/DemoProvider";
import type { TabItem } from "../../../components/ui";
import { useFilterForm } from "../../../utils/hooks";
import { COMPANY_KIND_LABELS } from "./constants";
import { filterCompanies } from "./helpers";
import type { CompanyKind } from "./types";

export function useCompanies() {
  const [state] = useDemo();
  const [kind, setKind] = useState<CompanyKind>("rf");
  const searchForm = useFilterForm({ search: "" });
  const tabs: TabItem<CompanyKind>[] = (["rf", "am"] as const).map((id) => ({
    id,
    label: `${COMPANY_KIND_LABELS[id]} · ${state.companies.filter((c) => c.kind === id).length}`,
  }));
  return {
    state,
    kind,
    setKind,
    tabs,
    searchControl: searchForm.control,
    companies: filterCompanies(state, kind, searchForm.values.search),
  };
}
