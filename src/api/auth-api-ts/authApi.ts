import { api } from "../api";
import { settled } from "../settled";
import { signedIn, userRefreshed } from "./authSlice";
import type {
  AuthResponse,
  AvatarUploadResponse,
  ChangePasswordRequest,
  SignInRequest,
  SignUpRequest,
  UpdateProfileRequest,
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

    updateProfile: build.mutation<UserDto, UpdateProfileRequest>({
      query: (body) => ({ url: `${base}/me`, method: "PATCH", body }),
      // The account owner also appears in the company directory of the workspace.
      invalidatesTags: ["Bootstrap", { type: "Company", id: "LIST" }],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await settled(queryFulfilled);
        if (data) dispatch(userRefreshed(data));
      },
    }),

    changePassword: build.mutation<void, ChangePasswordRequest>({
      query: (body) => ({ url: `${base}/password`, method: "POST", body }),
    }),

    uploadAvatar: build.mutation<AvatarUploadResponse, File>({
      query: (file) => {
        const body = new FormData();
        body.append("file", file);
        return { url: "/uploads/avatar", method: "POST", body };
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
} = authApi;
