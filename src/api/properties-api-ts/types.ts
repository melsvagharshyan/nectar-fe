import type { Offer, Property, PropertyAvailability } from "../../demo/types";
import type { CursorPage, OffsetPage, Slice } from "../pagination";

export interface PropertiesArgs {
  search?: string;
  status?: string;
  district?: string;
  price?: string | number;
  area?: string | number;
  rooms?: string | number;
  company?: string;
  matchRequest?: string;
  page?: number;
  limit?: number;
}

export interface PropertyListMeta {
  total: number;
  statusCounts: Partial<Record<PropertyAvailability, number>>;
  districts: string[];
}

export type PropertiesTable = OffsetPage<Property> &
  PropertyListMeta & { offers: Offer[] };

export type PropertiesFeed = CursorPage<Property> &
  Partial<PropertyListMeta> & { offers: Offer[] };

export type PropertyDetail = Slice;
