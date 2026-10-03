import type {
  Client,
  DemoEvent,
  Offer,
  Property,
  Request,
  Transfer,
} from "../demo/types";

export interface CursorPage<T> {
  items: T[];
  nextCursor: string | null;
}

/** `total` is only sent with the first page. */
export type CountedPage<T> = CursorPage<T> & { total?: number };

export interface OffsetPage<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

/** Records related to a page of items, already scoped to the caller's role. */
export interface Slice {
  clients: Client[];
  requests: Request[];
  properties: Property[];
  offers: Offer[];
  transfers: Transfer[];
  drafts: Record<string, string[]>;
  events: DemoEvent[];
}

export type WithSlice<P> = P & { slice: Slice };

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

/** Drops empty filters so the backend validation only sees real values. */
export const cleanParams = (params: QueryParams) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== "" && value !== false,
    ),
  ) as Record<string, string | number | boolean>;

export const cursorPageOptions = {
  initialPageParam: null as string | null,
  getNextPageParam: (last: { nextCursor: string | null }) => last.nextCursor,
};
