import { api } from "../api";
import { cleanParams, cursorPageOptions } from "../pagination";
import type { NotificationsArgs, NotificationsPage } from "./types";

export const notificationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.infiniteQuery<
      NotificationsPage,
      NotificationsArgs,
      string | null
    >({
      infiniteQueryOptions: cursorPageOptions,
      query: ({ queryArg, pageParam }) => ({
        url: "/notifications",
        params: cleanParams({ ...queryArg, cursor: pageParam }),
      }),
      providesTags: [{ type: "Notification", id: "LIST" }],
    }),
  }),
});

export const { useGetNotificationsInfiniteQuery } = notificationsApi;
