import { api } from "../api";
import { cleanParams, cursorPageOptions } from "../pagination";
import type { MutationResult } from "../workspace-api-ts/types";
import type {
  ApproveRegistrationResult,
  RegistrationsArgs,
  RegistrationsPage,
  RejectRegistrationArgs,
} from "./types";

const LIST = { type: "Registration", id: "LIST" } as const;

export const registrationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRegistrations: build.infiniteQuery<
      RegistrationsPage,
      RegistrationsArgs,
      string | null
    >({
      infiniteQueryOptions: cursorPageOptions,
      query: ({ queryArg, pageParam }) => ({
        url: "/registration-requests",
        params: cleanParams({ ...queryArg, cursor: pageParam }),
      }),
      providesTags: [LIST],
    }),

    // Approval creates a company, so company lists and analytics change too.
    approveRegistration: build.mutation<ApproveRegistrationResult, string>({
      query: (id) => ({
        url: `/registration-requests/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: (_result, error) =>
        error
          ? []
          : [LIST, "Bootstrap", "Analytics", { type: "Company", id: "LIST" }],
    }),

    rejectRegistration: build.mutation<MutationResult, RejectRegistrationArgs>({
      query: ({ id, reason }) => ({
        url: `/registration-requests/${id}/reject`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: (_result, error) => (error ? [] : [LIST, "Bootstrap"]),
    }),
  }),
});

export const {
  useGetRegistrationsInfiniteQuery,
  useApproveRegistrationMutation,
  useRejectRegistrationMutation,
} = registrationsApi;
