import { api } from "../api";
import type { Bootstrap } from "./types";

export const bootstrapApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBootstrap: build.query<Bootstrap, void>({
      query: () => "/bootstrap",
      providesTags: ["Bootstrap", { type: "Company", id: "LIST" }],
    }),
  }),
});

export const { useGetBootstrapQuery } = bootstrapApi;
