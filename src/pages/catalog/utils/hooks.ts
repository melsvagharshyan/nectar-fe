import { useState } from "react";
import { useDemo } from "../../../app/DemoProvider";
import { useRoute } from "../../../app/router";
import type { Role } from "../../../demo/types";
import { uniqueValues } from "../../../utils/helpers";
import { useFilterForm } from "../../../utils/hooks";
import { EMPTY_CATALOG_FILTERS } from "./constants";
import { catalogDataFor, filterCatalog } from "./helpers";
import type { CatalogStatus, CatalogView } from "./types";

export function useCatalog(role: Role) {
  const [state] = useDemo();
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

  const data = catalogDataFor(state, role);
  const base = data.properties.filter(
    (p) => role !== "broker" || p.availability === "active",
  );

  return {
    state,
    offers: data.offers,
    base,
    properties: filterCatalog(base, status, filterForm.values),
    districts: uniqueValues(base.map((p) => p.district)),
    partnerCompanies: state.companies.filter((c) => c.kind === "am"),
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
