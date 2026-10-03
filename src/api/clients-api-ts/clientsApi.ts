import { api } from "../api";
import { cleanParams, cursorPageOptions } from "../pagination";
import type { ClientDetail, ClientsArgs, ClientsPage } from "./types";

const base = "/clients";

export const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.infiniteQuery<ClientsPage, ClientsArgs, string | null>({
      infiniteQueryOptions: cursorPageOptions,
      query: ({ queryArg, pageParam }) => ({
        url: base,
        params: cleanParams({ ...queryArg, cursor: pageParam }),
      }),
      providesTags: [
        { type: "Client", id: "LIST" },
        { type: "Request", id: "LIST" },
      ],
    }),
    getClient: build.query<ClientDetail, string>({
      query: (id) => `${base}/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "Client", id },
        { type: "Request", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetClientsInfiniteQuery, useGetClientQuery } = clientsApi;
