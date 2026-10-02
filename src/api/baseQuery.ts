import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { signedOut, type AuthState } from "./auth-api-ts/authSlice";

// `import.meta.env` only exists under Vite; unit tests import this module through helpers.
export const API_URL = import.meta.env?.VITE_API_URL ?? "/api";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
});

/** Signs the user out when the backend rejects their session cookie. */
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  const signedIn = !!(api.getState() as { auth: AuthState }).auth.user;
  if (result.error?.status === 401 && signedIn) api.dispatch(signedOut());
  return result;
};
