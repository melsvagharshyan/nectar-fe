import type { Client } from "../../demo/types";
import type { CountedPage, Slice, WithSlice } from "../pagination";

export interface ClientsArgs {
  company?: string;
  search?: string;
  manager?: string;
  stage?: string;
  limit?: number;
}

export type ClientsPage = WithSlice<CountedPage<Client>>;

export type ClientDetail = Slice;
