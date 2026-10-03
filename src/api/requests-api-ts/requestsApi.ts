import { api } from "../api";
import { cleanParams, cursorPageOptions } from "../pagination";
import type {
  AdminRequestArgs,
  RequestDetail,
  RequestEvents,
  RequestsArgs,
  RequestsPage,
  RequestsTable,
} from "./types";

const base = "/requests";

const LIST_TAGS = [
  { type: "Request", id: "LIST" },
  { type: "Offer", id: "LIST" },
] as const;

export const requestsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRequests: build.infiniteQuery<RequestsPage, RequestsArgs, string | null>({
      infiniteQueryOptions: cursorPageOptions,
      query: ({ queryArg, pageParam }) => ({
        url: base,
        params: cleanParams({ ...queryArg, cursor: pageParam }),
      }),
      providesTags: [...LIST_TAGS],
    }),
    getRequestsTable: build.query<RequestsTable, AdminRequestArgs>({
      query: (args) => ({ url: `${base}/table`, params: cleanParams({ ...args }) }),
      providesTags: [...LIST_TAGS],
    }),
    getRequest: build.query<RequestDetail, string>({
      query: (id) => `${base}/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "Request", id },
        ...LIST_TAGS,
        { type: "Notification", id: "LIST" },
      ],
    }),
    getRequestEvents: build.query<RequestEvents, string>({
      query: (requestId) => ({ url: "/events", params: { requestId } }),
      providesTags: (_result, _error, id) => [
        { type: "Request", id },
        { type: "Notification", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetRequestsInfiniteQuery,
  useGetRequestsTableQuery,
  useGetRequestQuery,
  useGetRequestEventsQuery,
} = requestsApi;
