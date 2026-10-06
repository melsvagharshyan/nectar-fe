import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStoredUser } from "../session";
import type { UserDto } from "./types";

/** Why the server ended the session, shown on the sign-in page. */
export type SignOutReason = "blocked";

export interface AuthState {
  user: UserDto | null;
  signOutReason: SignOutReason | null;
}

const initialState: AuthState = { user: getStoredUser(), signOutReason: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signedIn: (state, { payload }: PayloadAction<UserDto>) => {
      state.user = payload;
      state.signOutReason = null;
    },
    userRefreshed: (state, { payload }: PayloadAction<UserDto>) => {
      state.user = payload;
    },
    signedOut: (
      state,
      { payload }: PayloadAction<{ reason?: SignOutReason } | undefined>,
    ) => {
      state.user = null;
      state.signOutReason = payload?.reason ?? null;
    },
    signOutReasonCleared: (state) => {
      state.signOutReason = null;
    },
  },
});

export const { signedIn, userRefreshed, signedOut, signOutReasonCleared } =
  authSlice.actions;
