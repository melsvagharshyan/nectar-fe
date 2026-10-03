import { api } from "../api";
import { cleanParams } from "../pagination";
import type { OffersTable, OffersTableArgs } from "./types";

export const offersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOffersTable: build.query<OffersTable, OffersTableArgs>({
      query: (args) => ({ url: "/offers/table", params: cleanParams({ ...args }) }),
      providesTags: [
        { type: "Offer", id: "LIST" },
        { type: "Request", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetOffersTableQuery } = offersApi;
