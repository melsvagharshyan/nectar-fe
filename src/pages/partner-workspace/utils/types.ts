import type { toPartnerView } from "../../../demo/projections";

export type PartnerData = ReturnType<typeof toPartnerView>;

export type PartnerRequest = PartnerData["requests"][number];

export type PartnerProperty = PartnerData["properties"][number];

export type PartnerRequestFilter = "active" | "mine" | "all";

export interface PartnerRequestFilters {
  search: string;
  filter: PartnerRequestFilter;
}

export type PropertyBaseView = "grid" | "list";
