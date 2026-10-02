import {
  toAdminView,
  toBrokerView,
  toPartnerView,
} from "../../../demo/projections";
import type { DemoState, Role } from "../../../demo/types";
import { currentCompanyId, matchesSearch } from "../../../utils/helpers";
import type { CatalogFilters, CatalogProperty, CatalogStatus } from "./types";

export const catalogDataFor = (state: DemoState, role: Role) =>
  role === "broker"
    ? toBrokerView(state, currentCompanyId())
    : role === "partner"
      ? toPartnerView(state, currentCompanyId())
      : toAdminView(state);

export const ownerCompanyId = (p: CatalogProperty) =>
  "companyId" in p ? p.companyId : undefined;

export const filterCatalog = (
  properties: CatalogProperty[],
  status: CatalogStatus,
  filters: CatalogFilters,
) =>
  properties.filter(
    (p) =>
      (!status || p.availability === status) &&
      matchesSearch(`${p.id} ${p.title} ${p.district}`, filters.search) &&
      (!filters.district || p.district === filters.district) &&
      (!filters.price || p.price <= Number(filters.price)) &&
      (!filters.area || p.area >= Number(filters.area)) &&
      (!filters.rooms || p.rooms === Number(filters.rooms)) &&
      (!filters.company || ownerCompanyId(p) === filters.company),
  );

export const countByStatus = (
  properties: CatalogProperty[],
  status: CatalogStatus,
) => properties.filter((p) => !status || p.availability === status).length;

export const propertyParameters = (p: CatalogProperty) => ({
  size: `${p.area} м² ${p.rooms ? `· ${p.rooms} комн.` : ""}`,
  details: `${p.floor !== null ? `${p.floor}/${p.floors ?? "—"} эт. · ` : ""}${p.type}`,
});
