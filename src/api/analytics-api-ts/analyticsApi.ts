import { api } from "../api";
import type { Analytics, DistrictStatsMap } from "./types";

export const analyticsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAnalytics: build.query<Analytics, void>({
      query: () => "/analytics",
      providesTags: ["Analytics", { type: "Request", id: "LIST" }],
    }),
    getDistrictStats: build.query<DistrictStatsMap, void>({
      query: () => "/stats/districts",
      providesTags: [{ type: "Property", id: "LIST" }],
    }),
  }),
});

export const { useGetAnalyticsQuery, useGetDistrictStatsQuery } = analyticsApi;
