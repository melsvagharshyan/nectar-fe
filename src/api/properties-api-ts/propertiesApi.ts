import { api } from "../api";
import { cleanParams, cursorPageOptions } from "../pagination";
import type {
  PropertiesArgs,
  PropertiesFeed,
  PropertiesTable,
  PropertyDetail,
} from "./types";

const base = "/properties";

const LIST_TAGS = [
  { type: "Property", id: "LIST" },
  { type: "Offer", id: "LIST" },
] as const;

export const propertiesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPropertiesTable: build.query<PropertiesTable, PropertiesArgs>({
      query: (args) => ({ url: base, params: cleanParams({ ...args }) }),
      providesTags: [...LIST_TAGS],
    }),
    getPropertiesFeed: build.infiniteQuery<
      PropertiesFeed,
      PropertiesArgs,
      string | null
    >({
      infiniteQueryOptions: cursorPageOptions,
      query: ({ queryArg, pageParam }) => ({
        url: `${base}/feed`,
        params: cleanParams({ ...queryArg, cursor: pageParam }),
      }),
      providesTags: [...LIST_TAGS],
    }),
    getProperty: build.query<PropertyDetail, string>({
      query: (id) => `${base}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Property", id }, ...LIST_TAGS],
    }),
  }),
});

export const {
  useGetPropertiesTableQuery,
  useGetPropertiesFeedInfiniteQuery,
  useGetPropertyQuery,
} = propertiesApi;
