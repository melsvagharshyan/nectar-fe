import type { Offer } from "../../demo/types";
import type { OffsetPage, WithSlice } from "../pagination";
import type { AdminRequestArgs } from "../requests-api-ts/types";

export interface OffersTableArgs extends AdminRequestArgs {
  state?: string;
}

export type OffersTable = WithSlice<OffsetPage<Offer>>;
