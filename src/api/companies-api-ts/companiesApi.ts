import { api } from "../api";
import { cleanParams, cursorPageOptions } from "../pagination";
import type { CompaniesArgs, CompaniesPage } from "./types";

export const companiesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCompanies: build.infiniteQuery<CompaniesPage, CompaniesArgs, string | null>({
      infiniteQueryOptions: cursorPageOptions,
      query: ({ queryArg, pageParam }) => ({
        url: "/companies",
        params: cleanParams({ ...queryArg, cursor: pageParam }),
      }),
      providesTags: [
        { type: "Company", id: "LIST" },
        { type: "Client", id: "LIST" },
        { type: "Property", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetCompaniesInfiniteQuery } = companiesApi;
