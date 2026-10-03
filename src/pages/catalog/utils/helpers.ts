import type { CatalogProperty } from "./types";

export const ownerCompanyId = (p: CatalogProperty) =>
  "companyId" in p ? p.companyId : undefined;

export const propertyParameters = (p: CatalogProperty) => ({
  size: `${p.area} м² ${p.rooms ? `· ${p.rooms} комн.` : ""}`,
  details: `${p.floor !== null ? `${p.floor}/${p.floors ?? "—"} эт. · ` : ""}${p.type}`,
});
