import { api } from "../api";
import { settled } from "../settled";
import { signedIn, userRefreshed } from "./authSlice";
import type {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
  UserDto,
} from "./types";

const base = "/auth";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<AuthResponse, SignInRequest>({
      query: (body) => ({ url: `${base}/sign-in`, method: "POST", body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await settled(queryFulfilled);
        if (data) dispatch(signedIn(data.user));
      },
    }),

    signUp: build.mutation<AuthResponse, SignUpRequest>({
      query: (body) => ({ url: `${base}/sign-up`, method: "POST", body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await settled(queryFulfilled);
        if (data) dispatch(signedIn(data.user));
      },
    }),

    signOut: build.mutation<void, void>({
      query: () => ({ url: `${base}/sign-out`, method: "POST" }),
    }),

    getMe: build.query<UserDto, void>({
      query: () => `${base}/me`,
      providesTags: ["Me"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await settled(queryFulfilled);
        if (data) dispatch(userRefreshed(data));
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGetMeQuery,
} = authApi;
