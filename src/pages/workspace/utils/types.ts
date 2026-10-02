import type { toBrokerView } from "../../../demo/projections";

export type BrokerData = ReturnType<typeof toBrokerView>;

export interface ClientFilters {
  search: string;
  manager: string;
  stage: string;
}

export interface RequestSearch {
  query: string;
}

export type OfferSort = "match" | "asc" | "desc";

export interface OfferFilters {
  district: string;
  budget: string;
  rooms: string;
  sort: OfferSort;
}

export type OfferTab = "all" | "selected" | "rejected";
