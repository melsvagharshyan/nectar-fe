import type { DemoEvent, Request } from "../../demo/types";
import type { CountedPage, OffsetPage, Slice, WithSlice } from "../pagination";

export interface RequestsArgs {
  clientId?: string;
  company?: string;
  stage?: string;
  search?: string;
  filter?: "all" | "mine" | "open";
  limit?: number;
}

export interface AdminRequestArgs {
  search?: string;
  view?: string;
  company?: string;
  partner?: string;
  attention?: boolean;
  page?: number;
  limit?: number;
}

export type RequestsPage = WithSlice<CountedPage<Request>>;

export type RequestsTable = WithSlice<OffsetPage<Request>>;

export type RequestDetail = Slice;

export interface RequestEvents {
  items: DemoEvent[];
}
