import { api } from "../api";
import type { MutationResult } from "../workspace-api-ts/types";
import type { Account, BlockUserArgs } from "./types";

// Approved application cards show the account state, so they refresh too.
const AFFECTED = ["Account", { type: "Registration", id: "LIST" }] as const;

export const accountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCompanyAccounts: build.query<Account[], string>({
      query: (companyId) => `/companies/${companyId}/accounts`,
      providesTags: (_result, _error, companyId) => [
        { type: "Account", id: companyId },
      ],
    }),

    blockUser: build.mutation<MutationResult, BlockUserArgs>({
      query: ({ id, reason }) => ({
        url: `/users/${id}/block`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: (_result, error) => (error ? [] : [...AFFECTED]),
    }),

    unblockUser: build.mutation<MutationResult, string>({
      query: (id) => ({ url: `/users/${id}/unblock`, method: "POST" }),
      invalidatesTags: (_result, error) => (error ? [] : [...AFFECTED]),
    }),
  }),
});

export const {
  useGetCompanyAccountsQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = accountsApi;
