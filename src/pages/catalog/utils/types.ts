import type { PublicProperty } from "../../../demo/projections";
import type { Property, PropertyAvailability } from "../../../demo/types";

export type CatalogProperty = PublicProperty | Property;

export type CatalogView = "table" | "grid";

export type CatalogStatus = "" | PropertyAvailability;

export interface CatalogFilters {
  search: string;
  district: string;
  company: string;
  price: string;
  area: string;
  rooms: string;
}
